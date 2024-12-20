import React, { useState } from 'react'

export default function GeneralLedger() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    timeRange: 'Last 7 Days',
    account: 'All Accounts',
    department: 'All Departments',
    transactionType: 'All Transaction Types',
    search: ''
  })

  const ledgerData = [
    {
      date: '2025-03-15',
      accountCode: '1001',
      accountName: 'Cash in Bank',
      description: 'Bar sales for Event X',
      debit: 1000.00,
      credit: null,
      balance: 1000.00,
      transactionId: 'TRX001',
      department: 'Bar'
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
    <div className="general-ledger">
      <h1>General Ledger</h1>

      <div className="filters-section">
        <div className="date-filters">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="timeRange"
            value={filters.timeRange}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        <div className="other-filters">
          <select
            name="account"
            value={filters.account}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>All Accounts</option>
          </select>
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>All Departments</option>
          </select>
          <select
            name="transactionType"
            value={filters.transactionType}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option>All Transaction Types</option>
          </select>
        </div>

        <div className="search-export">
          <input
            type="text"
            placeholder="Search transactions..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          <button className="export-btn">Export</button>
          <button className="print-btn">Print</button>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Debits</h3>
          <p className="amount green">$1,234,567.89</p>
        </div>
        <div className="summary-card">
          <h3>Total Credits</h3>
          <p className="amount red">$1,234,567.89</p>
        </div>
        <div className="summary-card">
          <h3>Net Balance</h3>
          <p className="amount blue">$0.00</p>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-placeholder">
          Graph of Debits and Credits Over Time
        </div>
      </div>

      <div className="ledger-entries">
        <h2>Ledger Entries</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Account Code</th>
              <th>Account Name</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
              <th>Transaction ID</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.map((entry) => (
              <tr key={entry.transactionId}>
                <td>{entry.date}</td>
                <td>{entry.accountCode}</td>
                <td>{entry.accountName}</td>
                <td>{entry.description}</td>
                <td>{entry.debit ? `$${entry.debit.toFixed(2)}` : '-'}</td>
                <td>{entry.credit ? `$${entry.credit.toFixed(2)}` : '-'}</td>
                <td>${entry.balance.toFixed(2)}</td>
                <td>{entry.transactionId}</td>
                <td>{entry.department}</td>
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
        <div className="pagination">
          <button className="pagination-btn" disabled>Previous</button>
          <span>Page 1 of 10</span>
          <button className="pagination-btn">Next</button>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="analysis-card">
          <h3>Debits and Credits by Account</h3>
          <div className="chart-placeholder">Bar Chart</div>
        </div>
        <div className="analysis-card">
          <h3>Expenses by Department</h3>
          <div className="chart-placeholder">Pie Chart</div>
        </div>
        <div className="analysis-card">
          <h3>Account Balances Over Time</h3>
          <div className="chart-placeholder">Trend Line</div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="info-card">
          <h3>Top Expense Accounts</h3>
          <ul>
            <li>Account 1</li>
            <li>Account 2</li>
            <li>Account 3</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>Most Active Accounts</h3>
          <ul>
            <li>Account A</li>
            <li>Account B</li>
            <li>Account C</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>Unusual Transactions</h3>
          <ul>
            <li>Transaction X - $10,000 above average</li>
            <li>Transaction Y - $5,000 below average</li>
          </ul>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="info-card">
          <h3>Audit Log</h3>
          <div className="audit-entries">
            <div className="audit-entry">
              <span>2025-03-15 10:30</span>
              <span>User A added transaction TRX001</span>
            </div>
            <div className="audit-entry">
              <span>2025-03-14 15:45</span>
              <span>User B edited transaction TRX002</span>
            </div>
          </div>
        </div>
        <div className="info-card">
          <h3>Reconciliation Tools</h3>
          <button className="reconcile-btn">Match Bank Statement</button>
          <button className="reconcile-btn">Reconcile Accounts</button>
        </div>
        <div className="info-card">
          <h3>User Permissions</h3>
          <select className="permission-select">
            <option>Select User Role</option>
          </select>
          <button className="permission-btn">Update Permissions</button>
        </div>
      </div>

      <button className="add-transaction-btn">+ Add Transaction</button>

      <style jsx>{`
        .general-ledger {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }

        .date-filters,
        .other-filters,
        .search-export {
          display: flex;
          gap: 10px;
        }

        .filter-input,
        .search-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .export-btn,
        .print-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .print-btn {
          background: white;
          color: #333;
          border: 1px solid #ddd;
        }

        .summary-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          margin: 10px 0 0 0;
        }

        .green { color: #00a854; }
        .red { color: #f5222d; }
        .blue { color: #1890ff; }

        .chart-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .chart-placeholder {
          height: 200px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .ledger-entries {
          background: white;
          padding: 20px;
          border-radius: 8px;
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
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .pagination-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .analysis-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .info-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
        }

        .info-card li {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .audit-entries {
          margin-top: 10px;
        }

        .audit-entry {
          display: flex;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .reconcile-btn,
        .permission-btn {
          width: 100%;
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        .permission-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 10px;
        }

        .add-transaction-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 12px 24px;
          background: #00a854;
          color: white;
          border: none;
          border-radius: 24px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}