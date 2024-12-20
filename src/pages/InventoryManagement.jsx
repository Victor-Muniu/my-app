import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import ReceiveItemsForm from '../components/maincomponents/ReceiveItemsForm'
export default function InventoryManagement() {
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('name')

  const [inventoryData, setInventoryData]= useState([])
  useEffect(()=>{
    fetchInventoryData()
  },[])
  const fetchInventoryData = async () =>{
    try {
      const response = await axios.get('http://localhost:3002/inventory');
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  }

  const stockValue = () => {
    return inventoryData.reduce((total, item) => {
      const itemValue = item.unit_price * item.quantity;
      return total + itemValue;
    }, 0);
  };
  const totalStockValue = stockValue();

  const stockQuantity = () => {
    return inventoryData.reduce((total,item)=>{
      const itemQuantity = item.quantity
      return total + itemQuantity
    }, 0)
  };
  const totalStockQuantity = stockQuantity()

  const outOfStockCount = inventoryData.filter(item => item.quantity === 0).length;
  const lowStockCount = inventoryData.filter(item => item.quantity <= 20).length

  const categories = [
    'All Items',
    'Beverage',
    'Housekeeping Supplies',
    'Office Supplies',
    'Maintenance and Repair',
    'Uniforms and Staff Gear',
    'Sweetner',
    'Spices',
    'Tubers',
    'Vegetables',
    'Fruits',
    'Cereals',
    'Red Meat',
    'White Meat',
    'Bakery',
    'Miscellaneous',
    'Dairy'
  ]

  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    image: '',
    unit_price: 0,
    quantity: 0,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/inventory', newItem);
      fetchInventoryData(); 
      setIsAddFormVisible(false); 
      setNewItem({
        name: '',
        category: '',
        image: '',
        unit_price: 0,
        quantity: 0,
      }); 
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortBy]);

  const filteredAndSortedInventory = useMemo(() => {
    return inventoryData
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All Categories' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'category':
            return a.category.localeCompare(b.category);
          case 'stock':
            return b.quantity - a.quantity;
          case 'value':
            return (b.unit_price * b.quantity) - (a.unit_price * a.quantity);
          default:
            return 0;
        }
      });
  }, [inventoryData, searchTerm, filterCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAndSortedInventory.slice(startIndex, endIndex);

  const [showReceiveForm, setShowReceiveForm] = useState(false);
  const handleReceiveItems = async (formData) => {
    try {
      await axios.post('http://localhost:3002/invoices', formData, {withCredentials: true});
      setShowReceiveForm(false);
      fetchInventoryData();
    } catch (error) {
      console.error("Error receiving items:", error);
    }
  };

  return (
    <div className="inventory-management">
      <div className="header">
        <h1>Inventory Management</h1>
        <div className="header-actions">
          <button className="add-btn" onClick={() => setIsAddFormVisible(true)}>+ Add Item</button>
          <button className='add-btn' onClick={() => setShowReceiveForm(true)}>Receive Items</button>
          <button className="export-btn">↓ Export</button>
          <button className="print-btn">🖨️ Print</button>
        </div>
      </div>

      {isAddFormVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Inventory Item</h2>
            <form onSubmit={handleAddItem}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.filter(cat => cat !== 'All Items').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newItem.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="unit_price">Unit Price:</label>
                <input
                  type="number"
                  id="unit_price"
                  name="unit_price"
                  value={newItem.unit_price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Add Item</button>
                <button type="button" className="cancel-btn" onClick={() => setIsAddFormVisible(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overview">
        <h2>Inventory Overview</h2>
        <div className="overview-cards">
          <div className="overview-card value">
            <h3>Total Stock Value</h3>
            <p className="amount">KSH {totalStockValue.toFixed(2)}</p>
          </div>
          <div className="overview-card quantity">
            <h3>Total Quantity</h3>
            <p className="amount">{totalStockQuantity}</p>
          </div>
          <div className="overview-card out-of-stock">
            <h3>Out of Stock Items</h3>
            <p className="amount warning">{outOfStockCount}</p>
          </div>
          <div className="overview-card alerts">
            <h3>Low Stock Alerts</h3>
            <p className="amount alert">{lowStockCount}</p>
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option>Filter by Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="stock">Sort by Stock Level</option>
            <option value="value">Sort by Value</option>
          </select>
        </div>
      </div>

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>ITEM NAME</th>
              <th>CATEGORY</th>
              <th>STOCK LEVEL</th>
              <th>UNIT COST</th>
              <th>TOTAL VALUE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="item-info">
                    <img src={item.image} alt="" className="item-image" />
                    <div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-description">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>
                  <span className={`stock-badge ${item.quantity <= 20 ? 'low-stock' : ''}`}>
                    {item.quantity} pcs
                  </span>
                </td>
                <td>KSH{item.unit_price.toFixed(2)}</td>
                <td>KSH{item.value.toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedInventory.length)} of {filteredAndSortedInventory.length} results</span>
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
          {[...Array(totalPages).keys()].map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number + 1)}
              className={currentPage === number + 1 ? 'active' : ''}
            >
              {number + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      {showReceiveForm && (
        <>
          <div className="modal-backdrop" onClick={() => setShowReceiveForm(false)} />
          <ReceiveItemsForm
            onClose={() => setShowReceiveForm(false)}
            onSubmit={handleReceiveItems}
          />
        </>
      )}

      <style jsx>{`
        .inventory-management {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .export-btn,
        .print-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .overview-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .overview-card h3 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 10px 0 0 0;
        }

        .amount.warning {
          color: #f9ab00;
        }

        .amount.alert {
          color: #d32f2f;
        }

        .category-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .category-tab {
          padding: 8px 16px;
          background: none;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          white-space: nowrap;
          color: #666;
        }

        .category-tab.active {
          background: #1a73e8;
          color: white;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .search-box input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 300px;
        }

        .filter-controls {
          display: flex;
          gap: 10px;
        }

        .filter-select,
        .sort-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .inventory-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 500;
          color: #666;
        }

        .item-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-image {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          object-fit: cover;
        }

        .item-name {
          font-weight: 500;
        }

        .item-description {
          font-size: 12px;
          color: #666;
        }

        .stock-badge {
          padding: 4px 8px;
          background: #e6f4ea;
          color: #1e8e3e;
          border-radius: 12px;
          font-size: 12px;
        }

        .stock-badge.low-stock {
          background: #fef7e0;
          color: #f9ab00;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 4px 8px;
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        .action-btn:hover {
          background: #f5f5f5;
        }

        .action-btn.delete {
          color: #d32f2f;
          border-color: #d32f2f;
        }

        .action-btn.delete:hover {
          background: #fde7e7;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pagination-controls {
          display: flex;
          gap: 5px;
        }

        .pagination-controls button {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-controls button.active {
          background: #1a73e8;
          color: white;
          border-color: #1a73e8;
        }

        .pagination-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          z-index: 1000;
        }

        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .submit-btn,
        .cancel-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn {
          background-color: #1a73e8;
          color: white;
        }

        .cancel-btn {
          background-color: #f1f3f4;
          color: #5f6368;
        }
      `}</style>
    </div>
  )
}

