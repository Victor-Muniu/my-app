import React, { useState } from 'react'

export default function ChartOfAccounts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [accountTypeFilter, setAccountTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('code')

  const summaryData = {
    assets: { label: 'Assets', amount: 1234567, color: '#00a854' },
    liabilities: { label: 'Liabilities', amount: 987654, color: '#f5222d' },
    equity: { label: 'Equity', amount: 246913, color: '#1890ff' },
    revenue: { label: 'Revenue', amount: 3456789, color: '#722ed1' },
    expenses: { label: 'Expenses', amount: 2345878, color: '#f5222d' }
  }

  const accountsData = [
    {
      code: '1000',
      name: 'Cash',
      type: 'Asset',
      balance: 50000,
      description: 'Cash on hand',
      status: 'Active'
    }
    // Add more accounts as needed
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="chart-of-accounts">
      <div className="header">
        <h1>Chart of Accounts</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="right-controls">
            <select 
              value={accountTypeFilter}
              onChange={(e) => setAccountTypeFilter(e.value)}
              className="filter-select"
            >
              <option value="All">Filter by Account Type</option>
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Equity">Equity</option>
              <option value="Revenue">Revenue</option>
              <option value="Expense">Expense</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.value)}
              className="sort-select"
            >
              <option value="code">Sort by Code</option>
              <option value="name">Sort by Name</option>
              <option value="balance">Sort by Balance</option>
            </select>
            <button className="export-btn">PDF</button>
            <button className="export-btn">Excel</button>
            <button className="add-btn">+ Add New Account</button>
          </div>
        </div>
      </div>

      <div className="summary-cards">
        {Object.entries(summaryData).map(([key, data]) => (
          <div key={key} className="summary-card" style={{ borderColor: data.color }}>
            <h3>{data.label}</h3>
            <p style={{ color: data.color }}>{formatCurrency(data.amount)}</p>
          </div>
        ))}
      </div>

      <div className="accounts-table">
        <table>
          <thead>
            <tr>
              <th>ACCOUNT CODE</th>
              <th>ACCOUNT NAME</th>
              <th>ACCOUNT TYPE</th>
              <th>BALANCE</th>
              <th>DESCRIPTION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {accountsData.map((account) => (
              <tr key={account.code}>
                <td>{account.code}</td>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>{formatCurrency(account.balance)}</td>
                <td>{account.description}</td>
                <td>
                  <span className={`status-badge ${account.status.toLowerCase()}`}>
                    {account.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">✏️</button>
                    <button className="action-btn">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Showing 1 to 10 of 97 results</span>
        <div className="pagination-controls">
          <button disabled>←</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>→</button>
        </div>
      </div>

      <div className="financial-insights">
        <h2>Financial Insights</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Total Assets vs Liabilities</h3>
            <div className="chart-placeholder">Chart Placeholder</div>
          </div>
          <div className="chart-card">
            <h3>Net Profit/Loss</h3>
            <div className="chart-placeholder">Chart Placeholder</div>
          </div>
          <div className="chart-card">
            <h3>Account Type Comparison</h3>
            <div className="chart-placeholder">Chart Placeholder</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chart-of-accounts {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          margin-bottom: 20px;
        }

        .header-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 10px;
        }

        .search-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .right-controls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .filter-select,
        .sort-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .export-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid;
        }

        .summary-card h3 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .summary-card p {
          margin: 10px 0 0 0;
          font-size: 24px;
          font-weight: bold;
        }

        .accounts-table {
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

        .status-badge.active {
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

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
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

        .financial-insights {
          margin-top: 40px;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .chart-card {
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
      `}</style>
    </div>
  )
}