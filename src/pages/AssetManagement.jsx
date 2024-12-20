import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function AssetManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  

  const [assetData, setAssetData]= useState([])
  useEffect(()=>{
    fetchAssetData()
  },[])
  const fetchAssetData = async () =>{
    try {
      const response = await axios.get('http://localhost:3002/assets');
      setAssetData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  }

  const assetValue = () => {
    return assetData.reduce((total, asset) => {
      const itemValue = asset.assetValue;
      return total + itemValue;
    }, 0);
  };
  const totalAssetValue = assetValue();

  const assetAvailability = () => {
    return assetData.reduce((total,asset)=>{
      const itemQuantity = asset.available
      return total + itemQuantity
    }, 0)
  };
  const totalAssetAvailability = assetAvailability()

  const assetSpoilt = () => {
    return assetData.reduce((total, asset)=>{
      const assetSpoilt = asset.spoilt
      return total + assetSpoilt
    },0)
  }
  const totalAssetSpoilt = assetSpoilt()

  const [isAddCardVisible, setIsAddCardVisible] = useState(false)
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    quantity: 0,
    spoilt: 0,
    purchasePrice: 0
  })

  const handleAddAsset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/assets', newAsset);
      fetchAssetData(); 
      setIsAddCardVisible(false); 
      setNewAsset({
        name: '',
        category: '',
        quantity: 0,
        spoilt: 0,
        purchasePrice: 0
      }); 
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value
    }));
  };
  return (
    <div className="asset-management">
      <div className="header">
        <h1>Asset Management</h1>
        <div className="header-controls">
          <button className="add-btn" onClick={() => setIsAddCardVisible(true)}>+ Add New Asset</button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isAddCardVisible && (
        <>
          <div className="overlay" onClick={() => setIsAddCardVisible(false)}></div>
          <div className="add-asset-card">
            <h2>Add New Asset</h2>
            <form onSubmit={handleAddAsset}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAsset.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={newAsset.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Office Equipment">Office Equipment</option>
                  <option value="Crockery">Crockery</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newAsset.quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="spoilt">Spoilt:</label>
                <input
                  type="number"
                  id="spoilt"
                  name="spoilt"
                  value={newAsset.spoilt}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchasePrice">Purchase Price:</label>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={newAsset.purchasePrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Add Asset</button>
                <button type="button" className="cancel-btn" onClick={() => setIsAddCardVisible(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}

      <div className="asset-overview">
        <h2>Asset Overview</h2>
        <div className="overview-cards">
          <div className="overview-card value">
            <h3>Total Asset Value</h3>
            <p className="amount">KSH {totalAssetValue}</p>
          </div>
          <div className="overview-card count">
            <h3>Total Number of Available Assets</h3>
            <p className="amount">{totalAssetAvailability}</p>
          </div>
          <div className="overview-card depreciation">
            <h3>Total Number of Assets Spoilt</h3>
            <p className="amount">{totalAssetSpoilt}</p>
          </div>
        </div>
      </div>

      <div className="asset-categories">
        <h2>Asset Categories</h2>
        <div className="category-tags">
          <button className="category-tag">Furniture and Fixtures</button>
          <button className="category-tag">Electronics and Appliances</button>
          <button className="category-tag">Machinery and Equipment</button>
          <button className="category-tag">Vehicles</button>
          <button className="category-tag">Office Equipment</button>
          <button className="category-tag">Maintenance Tools</button>
        </div>
      </div>

      <div className="asset-list">
        <h2>Asset List</h2>
        <table>
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Spoilt</th>
              <th>Unit Price</th>
              <th>Current Value</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetData.map((asset) => (
              <tr key={asset._id}>
                <td>{asset.name}</td>
                <td>{asset.category}</td>
                <td>{asset.quantity}</td>
                <td>{asset.available}</td>
                <td>{asset.spoilt}</td>
                <td>KSH {asset.purchasePrice}</td>
                <td>KSH {asset.assetValue.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${asset.status.toLowerCase().replace(' ', '-')}`}>
                    {asset.status}
                  </span>
                </td>
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

      

      

      <style jsx>{`
        .asset-management {
          padding: 20px;
          background-color: #f5f5f5;
          position: relative;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-controls {
          display: flex;
          gap: 20px;
        }

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .search-box input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 250px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .add-asset-card {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 300px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }

        .add-asset-card h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 18px;
          color: #333;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          color: #666;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
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
          font-size: 14px;
        }

        .submit-btn {
          background: #1a73e8;
          color: white;
        }

        .cancel-btn {
          background: #f1f3f4;
          color: #5f6368;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .overview-card {
          padding: 20px;
          border-radius: 8px;
          background: white;
        }

        .overview-card.value {
          background-color: #e8f0fe;
        }

        .overview-card.count {
          background-color: #e6f4ea;
        }

        .overview-card.depreciation {
          background-color: #fef7e0;
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

        .category-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .category-tag {
          padding: 6px 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 16px;
          cursor: pointer;
        }

        .category-tag:hover {
          background: #f5f5f5;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 500;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-badge.in-service {
          background-color: #e6f4ea;
          color: #1e8e3e;
        }

        .status-badge.needs-repair {
          background-color: #fef7e0;
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

        h2 {
          margin-bottom: 20px;
          color: #333;
        }
      `}</style>
    </div>
  )
}