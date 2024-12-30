import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Logo from "../../images/Logo.jpg";

function RequisitionForm({ onSubmit, onClose }) {
  const [department, setDepartment] = useState("");
  const [inventoryItems, setInventoryItems] = useState([
    { name: "", quantity: 0 },
  ]);
  const [justification, setJustification] = useState("");
  const [inventoryList, setInventoryList] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3002/inventory");
      setInventoryList(response.data.map((item) => item.name));
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleInventoryChange = (e, index) => {
    const value = e.target.value;
    const updatedItems = [...inventoryItems];
    updatedItems[index] = { ...updatedItems[index], name: value };
    setInventoryItems(updatedItems);
    setFilteredInventory(
      inventoryList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleQuantityChange = (e, index) => {
    const value = parseInt(e.target.value);
    const updatedItems = [...inventoryItems];
    updatedItems[index] = { ...updatedItems[index], quantity: value };
    setInventoryItems(updatedItems);
  };

  const addInventoryItem = () => {
    setInventoryItems([...inventoryItems, { name: "", quantity: 0 }]);
  };

  const removeInventoryItem = (index) => {
    const updatedItems = inventoryItems.filter((_, i) => i !== index);
    setInventoryItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      inventoryItems,
      department,
    };
    await onSubmit(data);
    // Reset form
    setDepartment("");
    setInventoryItems([{ name: "", quantity: 0 }]);
    setJustification("");
  };

  return (
    <div className="requisition-form">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <header className="header">
        <div className="logo-section">
          <img src={Logo} alt="Restaurant Logo" className="logo" />
          <h1>Epashikino Resort & Spa</h1>
        </div>
        <div className="request-info">
          <div>
            Request #: REQ-{new Date().getFullYear()}-
            {Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}
          </div>
          <div>Date: {new Date().toLocaleString()}</div>
        </div>
      </header>

      <h2>Inventory Requisition Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="Food and Beverage Production">
              Food and Beverage Production
            </option>
            <option value="Food and Beverage Service">
              Food and Beverage Service
            </option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Front Office">Front Office</option>
          </select>
        </div>

        <div className="form-group">
          <label>Inventory Items:</label>
          {inventoryItems.map((item, index) => (
            <div key={index} className="inventory-item">
              <div className="item-input-container">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleInventoryChange(e, index)}
                  placeholder="Item name"
                  required
                />
                {filteredInventory.length > 0 && (
                  <ul className="suggestions">
                    {filteredInventory.map((invItem, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          const updatedItems = [...inventoryItems];
                          updatedItems[index].name = invItem;
                          setInventoryItems(updatedItems);
                          setFilteredInventory([]);
                        }}
                      >
                        {invItem}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, index)}
                placeholder="Quantity"
                required
              />
              <button
                type="button"
                onClick={() => removeInventoryItem(index)}
                className="remove-item-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInventoryItem}
            className="add-item-btn"
          >
            Add Item
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="justification">Justification/Reason:</label>
          <textarea
            id="justification"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Request
          </button>
        </div>
      </form>

      <style jsx>{`
        .requisition-form {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .logo-section h1 {
          font-size: 24px;
          margin: 0;
        }

        .request-info {
          text-align: right;
          font-size: 14px;
          color: #666;
        }

        h2 {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .inventory-item {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .item-input-container {
          position: relative;
          flex-grow: 1;
        }

        .suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-top: none;
          list-style-type: none;
          margin: 0;
          padding: 0;
          max-height: 150px;
          overflow-y: auto;
          z-index: 1;
        }

        .suggestions li {
          padding: 8px;
          cursor: pointer;
        }

        .suggestions li:hover {
          background-color: #f0f0f0;
        }

        .add-item-btn,
        .remove-item-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .add-item-btn {
          background-color: #4caf50;
          color: white;
        }

        .remove-item-btn {
          background-color: #f44336;
          color: white;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .submit-button {
          padding: 10px 20px;
          background-color: #2196f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-button:hover {
          background-color: #1976d2;
        }
      `}</style>
    </div>
  );
}

export default RequisitionForm;
