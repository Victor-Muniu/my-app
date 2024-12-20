import React, { useState } from 'react'

export default function TrialBalance() {
  const [timeFilter, setTimeFilter] = useState('Last Month')
  const [searchTerm, setSearchTerm] = useState('')
  const [accountTypeFilter, setAccountTypeFilter] = useState('All Account Types')

  const accounts = [
    {
      code: '1001',
      name: 'Cash',
      debitAmount: 20000,
      creditAmount: 0,
      balance: 20000,
      department: 'Finance',
      type: 'Asset'
    },
    {
      code: '1002',
      name: 'Accounts Receivable',
      debitAmount: 5000,
      creditAmount: 0,
      balance: 5000,
      department: 'Rooms',
      type: 'Asset'
    },
    {
      code: '2001',
      name: 'Accounts Payable',
      debitAmount: 0,
      creditAmount: 3000,
      balance: -3000,
      department: 'Finance',
      type: 'Liability'
    }
  ]

  const totalDebits = 46000
  const totalCredits = 26000
  const discrepancy = totalDebits - totalCredits

  return (
    <div className="trial-balance">
      <div className="header">
        <div className="left-controls">
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="filter-select"
          >
            <option>Last Month</option>
            <option>This Month</option>
            <option>Last Quarter</option>
          </select>
          <button className="export-btn">Export</button>
          <button className="print-btn">Print</button>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="summary-section">
        <div className="totals">
          <div className="total-card">
            <h3>Total Debits</h3>
            <p className="amount">${totalDebits.toLocaleString()}</p>
          </div>
          <div className="total-card">
            <h3>Total Credits</h3>
            <p className="amount">${totalCredits.toLocaleString()}</p>
          </div>
        </div>
        
        {discrepancy !== 0 && (
          <div className="warning-banner">
            Warning: Trial Balance is not balanced. Difference: ${Math.abs(discrepancy).toLocaleString()}
          </div>
        )}
      </div>

      <div className="accounts-table">
        <table>
          <thead>
            <tr>
              <th>Account Code</th>
              <th>Account Name</th>
              <th>Debit Amount</th>
              <th>Credit Amount</th>
              <th>Balance</th>
              <th>Department</th>
              <th>Account Type</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.code}>
                <td>{account.code}</td>
                <td>{account.name}</td>
                <td>${account.debitAmount.toLocaleString()}</td>
                <td>${account.creditAmount.toLocaleString()}</td>
                <td>${account.balance.toLocaleString()}</td>
                <td>{account.department}</td>
                <td>{account.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="validation-section">
        <h3>Validation</h3>
        <div className="error-message">
          Error: Trial Balance is not balanced. Discrepancy: ${Math.abs(discrepancy).toLocaleString()}
        </div>
        <button className="view-btn">View Discrepancies</button>
      </div>

      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters">
          <select
            value={accountTypeFilter}
            onChange={(e) => setAccountTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option>All Account Types</option>
            <option>Assets</option>
            <option>Liabilities</option>
            <option>Equity</option>
          </select>
          <select className="filter-select">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Debits vs Credits Comparison</h3>
          <div className="chart-placeholder">
            Pie Chart Placeholder
          </div>
        </div>
        <div className="chart-card">
          <h3>Department Breakdown</h3>
          <div className="chart-placeholder">
            Bar Chart Placeholder
          </div>
        </div>
      </div>

      <style jsx>{`
        .trial-balance {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .left-controls {
          display: flex;
          gap: 10px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .export-btn, .print-btn {
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .export-btn {
          background: #1a73e8;
          color: white;
          border: none;
        }

        .print-btn {
          background: white;
          border: 1px solid #ddd;
        }

        .search-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 250px;
        }

        .summary-section {
          margin-bottom: 20px;
        }

        .totals {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .total-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          flex: 1;
        }

        .total-card h3 {
          margin: 0;
          color: #666;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 10px 0 0 0;
          color: #1a73e8;
        }

        .warning-banner {
          background: #fff3dc;
          border: 1px solid #ffd592;
          color: #875000;
          padding: 12px;
          border-radius: 4px;
          margin-top: 10px;
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

        .validation-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .error-message {
          background: #fde7e7;
          border: 1px solid #ffa39e;
          color: #cf1322;
          padding: 12px;
          border-radius: 4px;
          margin: 10px 0;
        }

        .view-btn {
          background: #1a73e8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .filters-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .filters {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .chart-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .chart-placeholder {
          height: 300px;
          background: #f5f5f5;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          color: #666;
        }
      `}</style>
    </div>
  )
}