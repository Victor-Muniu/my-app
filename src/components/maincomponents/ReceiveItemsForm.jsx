import React, { useState, useEffect } from "react";
import axios from "axios";

const ReceiveItemsForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    invoice_number: "",
    supplier_name: "",
    lpo_number: "",
    items_received: [{ inventory_name: "", quantity_received: "" }],
  });

  const [inventoryItems, setInventoryItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState([]);
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  useEffect(() => {
    fetchInventoryItems();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSupplierSuggestions([]);
        setItemSuggestions([]);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get("http://localhost:3002/inventory");
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/supplier");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "supplier_name") {
      const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(value.toLowerCase())
      );
      setSupplierSuggestions(filteredSuppliers);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items_received];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      items_received: newItems,
    }));

    if (field === "inventory_name") {
      const filteredItems = inventoryItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setItemSuggestions(filteredItems);
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items_received: [
        ...prev.items_received,
        { inventory_name: "", quantity_received: "" },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items_received: prev.items_received.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSupplierSelect = (supplier) => {
    setFormData((prev) => ({
      ...prev,
      supplier_name: supplier.name,
    }));
    setSupplierSuggestions([]);
  };

  const handleItemSelect = (item, index) => {
    const newItems = [...formData.items_received];
    newItems[index] = {
      ...newItems[index],
      inventory_name: item.name,
    };
    setFormData((prev) => ({
      ...prev,
      items_received: newItems,
    }));
    setItemSuggestions([]);
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Receive Items</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="invoice_number">Invoice Number</label>
          <input
            type="text"
            id="invoice_number"
            name="invoice_number"
            value={formData.invoice_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplier_name">Supplier Name</label>
          <input
            type="text"
            id="supplier_name"
            name="supplier_name"
            value={formData.supplier_name}
            onChange={handleChange}
            required
          />
          {supplierSuggestions.length > 0 && (
            <ul className="suggestions">
              {supplierSuggestions.map((supplier) => (
                <li
                  key={supplier._id}
                  onClick={() => handleSupplierSelect(supplier)}
                >
                  {supplier.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lpo_number">LPO Number</label>
          <input
            type="text"
            id="lpo_number"
            name="lpo_number"
            value={formData.lpo_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="items-section">
          <div className="items-header">
            <h3>Items Received</h3>
            <button type="button" className="add-item-btn" onClick={addItem}>
              + Add Item
            </button>
          </div>

          {formData.items_received.map((item, index) => (
            <div key={index} className="item-row">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={item.inventory_name}
                  onFocus={() => setActiveItemIndex(index)} 
                  onBlur={() => setTimeout(() => setActiveItemIndex(null), 200)}
                  onChange={(e) =>
                    handleItemChange(index, "inventory_name", e.target.value)
                  }
                  required
                />
                {activeItemIndex === index && itemSuggestions.length > 0 && (
                  <ul className="suggestions">
                    {itemSuggestions.map((inventoryItem) => (
                      <li
                        key={inventoryItem._id}
                        onClick={() => handleItemSelect(inventoryItem, index)}
                      >
                        {inventoryItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={item.quantity_received}
                  onChange={(e) =>
                    handleItemChange(index, "quantity_received", e.target.value)
                  }
                  required
                  min="1"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-card {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 800px;
          max-width: calc(100% - 40px);
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          overflow-y: auto;
          max-height: calc(100vh - 40px);
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f9fafb;
        }

        .form-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: #111827;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          transition: color 0.2s;
        }

        .close-button:hover {
          color: #111827;
        }

        form {
          padding: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        input,
        select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }

        input:focus,
        select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #d1d5db;
          border-top: none;
          border-radius: 0 0 6px 6px;
          list-style-type: none;
          padding: 0;
          margin: 0;
          max-height: 200px;
          overflow-y: auto;
          z-index: 10;
        }

        .suggestions li {
          padding: 8px 12px;
          cursor: pointer;
        }

        .suggestions li:hover {
          background-color: #f3f4f6;
        }

        .items-section {
          margin-top: 24px;
          background-color: #f9fafb;
          border-radius: 6px;
          padding: 16px;
        }

        .items-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .items-header h3 {
          margin: 0;
          font-size: 1rem;
          color: #374151;
        }

        .add-item-btn {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;
        }

        .add-item-btn:hover {
          background-color: #2563eb;
        }

        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 12px;
          align-items: end;
          padding: 12px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .remove-item-btn {
          padding: 6px 12px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: background-color 0.2s;
        }

        .remove-item-btn:hover {
          background-color: #dc2626;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .submit-btn,
        .cancel-btn {
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .submit-btn {
          background: #3b82f6;
          color: white;
          border: none;
        }

        .submit-btn:hover {
          background-color: #2563eb;
        }

        .cancel-btn {
          background: white;
          border: 1px solid #d1d5db;
          color: #374151;
        }

        .cancel-btn:hover {
          background-color: #f3f4f6;
        }

        @media (max-width: 640px) {
          .form-card {
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-width: none;
            border-radius: 0;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .item-row {
            grid-template-columns: 1fr 1fr;
          }

          .remove-item-btn {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiveItemsForm;
