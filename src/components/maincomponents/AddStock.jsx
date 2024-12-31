import React, {useState} from 'react'

function AddStock({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        unit_price: 0,
        quantity: 0,
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit_price">Unit Price:</label>
            <input
              id="unit_price"
              type="number"
              value={formData.unit_price}
              onChange={(e) =>
                setFormData({ ...formData, unit_price: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add Item</button>
          </div>
        </form>
      </div>
      <style jsx>{`
      .curio-shop {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo {
          width: 40px;
          height: 40px;
          background-color: #000;
        }

        .header h1 {
          font-size: 24px;
          margin: 0;
        }

        .header-right {
          text-align: right;
        }

        .header-right p {
          margin: 0;
          color: #666;
        }

        .search-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .search-input {
          flex: 1;
        }

        .search-input input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .search-bar select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 150px;
        }

        .add-item-btn {
          background-color: #4285f4;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .low-stock-section {
          margin-bottom: 30px;
        }

        .low-stock-items {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 10px 0;
        }

        .low-stock-card {
          min-width: 200px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .low-stock-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
        }

        .stock-label {
          color: #dc3545;
          font-weight: 500;
        }

        .reorder-btn {
          width: 100%;
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .view-toggles button {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }

        .view-toggles button.active {
          background-color: #4285f4;
          color: white;
          border-color: #4285f4;
        }

        .inventory-items.list table {
          width: 100%;
          border-collapse: collapse;
        }

        .inventory-items.list th,
        .inventory-items.list td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .item-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .item-name img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
        }

        .grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .grid-item {
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .grid-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .edit-btn,
        .delete-btn {
          flex: 1;
          padding: 6px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-btn {
          background-color: #4285f4;
          color: white;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .modal-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .modal-actions button[type="submit"] {
          background-color: #4285f4;
          color: white;
        }

        .modal-actions button[type="button"] {
          background-color: #ddd;
        }
      `}</style>
    </div>
  )
}

export default AddStock