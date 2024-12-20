import React, { useState, useEffect } from "react";
import axios from "axios";

const AddLPOForm = ({ onClose, onSubmit }) => {
  const [lpoNumber, setLpoNumber] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [inventoryItems, setInventoryItems] = useState([
    { inventory_name: "", quantity: 0 },
  ]);
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    fetchSuppliers();
    fetchInventory();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/supplier");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3002/inventory");
      setInventoryList(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      lpo_number: lpoNumber,
      supplier_name: supplierName,
      inventory_items: inventoryItems,
    };
    onSubmit(data);
  };

  const handleSupplierChange = (e) => {
    const value = e.target.value;
    setSupplierName(value);
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleInventoryChange = (e, index) => {
    const value = e.target.value;
    const updatedItems = [...inventoryItems];
    updatedItems[index] = { ...updatedItems[index], inventory_name: value };
    setInventoryItems(updatedItems);
    setFilteredInventory(
      inventoryList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const addInventoryItem = () => {
    setInventoryItems([...inventoryItems, { inventory_name: "", quantity: 0 }]);
  };

  return (
    <div className="overlay">
      <div className="form-card">
        <h2>Add New LPO</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="lpoNumber">LPO Number:</label>
            <input
              type="text"
              id="lpoNumber"
              value={lpoNumber}
              onChange={(e) => setLpoNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplierName">Supplier Name:</label>
            <input
              type="text"
              id="supplierName"
              value={supplierName}
              onChange={handleSupplierChange}
              required
            />
            {filteredSuppliers.length > 0 && (
              <ul className="suggestions">
                {filteredSuppliers.map((supplier) => (
                  <li
                    key={supplier._id}
                    onClick={() => {
                      setSupplierName(supplier.name);
                      setFilteredSuppliers([]);
                    }}
                  >
                    {supplier.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>Inventory Items:</label>
            {inventoryItems.map((item, index) => (
              <div key={index} className="inventory-item">
                <input
                  type="text"
                  value={item.inventory_name}
                  onChange={(e) => handleInventoryChange(e, index)}
                  placeholder="Item name"
                  required
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    setInventoryItems(
                      inventoryItems.map((i, idx) =>
                        idx === index
                          ? { ...i, quantity: parseInt(e.target.value) }
                          : i
                      )
                    )
                  }
                  placeholder="Quantity"
                  required
                />
                {filteredInventory.length > 0 && (
                  <ul className="suggestions">
                    {filteredInventory.map((invItem) => (
                      <li
                        key={invItem._id}
                        onClick={() => {
                          setInventoryItems(
                            inventoryItems.map((i, idx) =>
                              idx === index
                                ? { ...i, inventory_name: invItem.name }
                                : i
                            )
                          );
                          setFilteredInventory([]);
                        }}
                      >
                        {invItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <button type="button" onClick={addInventoryItem}>
              Add Item
            </button>
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 50px;
          z-index: 999;
        }

        .form-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          width: 500px;
          max-width: calc(100% - 2rem);
          max-height: calc(100vh - 100px);
          overflow-y: auto;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: #2d3748;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a5568;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s ease-in-out;
        }

        input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }

        .inventory-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .inventory-item input {
          flex: 1;
        }

        .suggestions {
          list-style-type: none;
          padding: 0.5rem 0;
          margin: 0.25rem 0 0;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          max-height: 150px;
          overflow-y: auto;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .suggestions li {
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .suggestions li:hover {
          background-color: #edf2f7;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        button[type="submit"] {
          background-color: #4299e1;
          color: white;
        }

        button[type="submit"]:hover {
          background-color: #3182ce;
          transform: translateY(-1px);
        }

        button[type="button"] {
          background-color: #edf2f7;
          color: #4a5568;
        }

        button[type="button"]:hover {
          background-color: #e2e8f0;
          transform: translateY(-1px);
        }

        button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }

        button[type="button"]:last-child {
          background-color: #fed7d7;
          color: #c53030;
        }

        button[type="button"]:last-child:hover {
          background-color: #feb2b2;
        }

        .add-item-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #48bb78;
          color: white;
          margin-top: 0.5rem;
        }

        .add-item-btn:hover {
          background-color: #38a169;
        }
      `}</style>
    </div>
  );
};

export default AddLPOForm;
