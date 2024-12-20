import React, { useState } from 'react'

export default function ExpenseManagement() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'All Categories',
    costCenter: 'All Cost Centers',
    supplier: 'All Suppliers',
    search: ''
  })

  const expenseData = [
    {
      date: '2025-03-15',
      voucherNumber: 'EXP-001',
      costCenter: 'Housekeeping',
      expenseCategory: 'Supplies',
      description: 'Cleaning Materials',
      quantity: 10,
      unitPrice: 25.00,
      totalAmount: 250.00,
      paymentMethod: 'Credit Card',
      status: 'Paid',
      tax: 20.00
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
    <div className="expense-container">
      <h1>Expense Management</h1>

      <div className="filters-section">
        <button className="add-button">+ Add New Expense</button>
        
        <div className="filters-group">
          <div className="date-range">
            <span>Date Range:</span>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="filter-input"
            />
            <span>to</span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>All Categories</option>
          </select>

          <select
            name="costCenter"
            value={filters.costCenter}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>All Cost Centers</option>
          </select>

          <select
            name="supplier"
            value={filters.supplier}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>All Suppliers</option>
          </select>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search expenses..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
      </div>

      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Expense Date</th>
              <th>Voucher Number</th>
              <th>Cost Center</th>
              <th>Expense Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Tax & Deductions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense) => (
              <tr key={expense.voucherNumber}>
                <td>{expense.date}</td>
                <td>{expense.voucherNumber}</td>
                <td>{expense.costCenter}</td>
                <td>{expense.expenseCategory}</td>
                <td>{expense.description}</td>
                <td>{expense.quantity}</td>
                <td>${expense.unitPrice.toFixed(2)}</td>
                <td>${expense.totalAmount.toFixed(2)}</td>
                <td>{expense.paymentMethod}</td>
                <td>
                  <span className={`status-badge ${expense.status.toLowerCase()}`}>
                    {expense.status}
                  </span>
                </td>
                <td>${expense.tax.toFixed(2)}</td>
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

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Expense Category Breakdown</h3>
          <div className="chart-placeholder">
            Pie Chart Placeholder
          </div>
        </div>

        <div className="summary-card">
          <h3>Monthly Expense Trends</h3>
          <div className="chart-placeholder">
            Line Graph Placeholder
          </div>
        </div>

        <div className="summary-card">
          <h3>Outstanding Payments</h3>
          <ul className="payment-list">
            <li>
              <span>Supplier A</span>
              <span>$1,500.00</span>
            </li>
            <li>
              <span>Supplier B</span>
              <span>$750.00</span>
            </li>
            <li>
              <span>Supplier C</span>
              <span>$2,200.00</span>
            </li>
          </ul>
        </div>

        <div className="summary-card">
          <h3>Top Suppliers by Expense Volume</h3>
          <ol className="supplier-list">
            <li>
              <span>Supplier X</span>
              <span>$10,000.00</span>
            </li>
            <li>
              <span>Supplier Y</span>
              <span>$8,500.00</span>
            </li>
            <li>
              <span>Supplier Z</span>
              <span>$7,200.00</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="footer-section">
        <div className="totals">
          <div className="total-item">
            <span>Total Expenses for Period</span>
            <span className="amount">$45,678.90</span>
          </div>
          <div className="total-item">
            <span>Outstanding Payables</span>
            <span className="amount">$12,345.67</span>
          </div>
          <div className="total-item">
            <span>Budget vs. Actual</span>
            <span className="amount negative">-$2,345.67</span>
          </div>
          <div className="total-item">
            <span>Net Impact on P&L</span>
            <span className="amount positive">+$5,678.90</span>
          </div>
        </div>

        <div className="footer-actions">
          <div className="left-actions">
            <button className="secondary-button">📥 Export</button>
            <button className="secondary-button">🖨️ Print</button>
          </div>
          <div className="right-actions">
            <button className="primary-button">✓ Batch Approve</button>
            <button className="secondary-button">📦 Archive Selected</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .expense-container {
          padding: 20px;
          background-color: #f5f5f5;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 24px;
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
          align-items: center;
        }

        .filters-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .date-range {
          display: flex;
          align-items: center;
          gap: 8px;
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

        .expense-table {
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

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .chart-placeholder {
          height: 200px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          border-radius: 4px;
        }

        .payment-list, .supplier-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
        }

        .payment-list li, .supplier-list li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .footer-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .totals {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .total-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .amount {
          font-size: 20px;
          font-weight: bold;
        }

        .negative {
          color: #d32f2f;
        }

        .positive {
          color: #2e7d32;
        }

        .footer-actions {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .left-actions, .right-actions {
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

        .primary-button {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}