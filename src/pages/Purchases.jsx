import React, { useState } from 'react'

export default function Purchases() {
  const [filters, setFilters] = useState({
    dateRange: '',
    supplier: 'All Suppliers',
    category: 'All Categories',
    search: ''
  })

  const purchasesData = [
    {
      date: '2025-03-15',
      id: 'PUR-001',
      supplier: 'Acme Supplies',
      category: 'Food & Beverages',
      description: 'Fresh Produce',
      quantity: 100,
      unitPrice: 2.50,
      totalCost: 250.00,
      status: 'Paid'
    },
    {
      date: '2025-03-16',
      id: 'PUR-002',
      supplier: 'Clean Co.',
      category: 'Housekeeping Supplies',
      description: 'Cleaning Products',
      quantity: 50,
      unitPrice: 5.00,
      totalCost: 250.00,
      status: 'Pending'
    }
  ]

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="purchases-container">
      <div className="filters-section">
        <div className="filters-group">
          <div className="filter">
            <input
              type="date"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>
          
          <div className="filter">
            <select
              name="supplier"
              value={filters.supplier}
              onChange={handleFilterChange}
              className="filter-input"
            >
              <option>All Suppliers</option>
              <option>Acme Supplies</option>
              <option>Clean Co.</option>
            </select>
          </div>

          <div className="filter">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-input"
            >
              <option>All Categories</option>
              <option>Food & Beverages</option>
              <option>Housekeeping Supplies</option>
            </select>
          </div>

          <div className="filter">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search purchases..."
              className="filter-input"
            />
          </div>
        </div>

        <button className="add-button">
          + Add New Purchase
        </button>
      </div>

      <div className="purchases-table">
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>PURCHASE ID</th>
              <th>SUPPLIER NAME</th>
              <th>CATEGORY</th>
              <th>DESCRIPTION</th>
              <th>QUANTITY</th>
              <th>UNIT PRICE</th>
              <th>TOTAL COST</th>
              <th>PAYMENT STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {purchasesData.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.date}</td>
                <td>{purchase.id}</td>
                <td>{purchase.supplier}</td>
                <td>{purchase.category}</td>
                <td>{purchase.description}</td>
                <td>{purchase.quantity}</td>
                <td>${purchase.unitPrice.toFixed(2)}</td>
                <td>${purchase.totalCost.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${purchase.status.toLowerCase()}`}>
                    {purchase.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">👁️</button>
                    <button className="action-btn">✏️</button>
                    <button className="action-btn">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Monthly Purchases</h3>
          <p className="amount">$15,750.00</p>
        </div>

        <div className="summary-card">
          <h3>Outstanding Payables</h3>
          <p className="amount red">$3,250.00</p>
        </div>

        <div className="summary-card">
          <h3>Category Breakdown</h3>
          <div className="chart-placeholder">
            Chart Placeholder
          </div>
        </div>

        <div className="summary-card">
          <h3>Top Suppliers</h3>
          <div className="supplier-list">
            <div className="supplier-item">
              <span>Acme Supplies</span>
              <span>$5,000</span>
            </div>
            <div className="supplier-item">
              <span>Clean Co.</span>
              <span>$3,500</span>
            </div>
            <div className="supplier-item">
              <span>Food Distributors Inc.</span>
              <span>$2,750</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section">
        <div className="export-buttons">
          <button className="secondary-button">📥 Export</button>
          <button className="secondary-button">🖨️ Print</button>
        </div>
        <div className="pagination">
          <span>Showing 1-10 of 50 entries</span>
          <div className="pagination-buttons">
            <button disabled>←</button>
            <button>→</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .purchases-container {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 20px;
        }

        .filters-group {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .add-button {
          padding: 8px 16px;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .purchases-table {
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
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-badge.paid {
          background-color: #e6f4ea;
          color: #1e8e3e;
        }

        .status-badge.pending {
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
          border: none;
          cursor: pointer;
        }

        .summary-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin-top: 10px;
        }

        .amount.red {
          color: #d32f2f;
        }

        .chart-placeholder {
          height: 150px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          border-radius: 4px;
        }

        .supplier-list {
          margin-top: 10px;
        }

        .supplier-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .footer-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .export-buttons {
          display: flex;
          gap: 10px;
        }

        .secondary-button {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .pagination-buttons {
          display: flex;
          gap: 5px;
        }

        .pagination-buttons button {
          padding: 4px 8px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}