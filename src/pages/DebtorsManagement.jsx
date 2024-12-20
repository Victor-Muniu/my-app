import React, { useState } from 'react'

export default function DebtorsManagement() {
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: '',
    debtType: '',
    startDate: '',
    endDate: '',
    minBalance: '',
    maxBalance: ''
  })

  const debtors = [
    {
      id: 'DB001',
      name: 'John Doe',
      contact: 'johndoe@example.com',
      balance: 1500.00,
      invoiceDate: '2025-03-15',
      dueDate: '2025-04-15',
      status: 'Pending',
      debtType: 'Room Charges'
    },
    {
      id: 'DB002',
      name: 'Jane Smith',
      contact: 'janesmith@example.com',
      balance: 750.00,
      invoiceDate: '2025-03-20',
      dueDate: '2025-04-20',
      status: 'Paid',
      debtType: 'Restaurant Bills'
    }
  ]

  const agingReport = [
    { category: 'Current', amount: 10000.00, percentage: 38.5 },
    { category: '1-30 days overdue', amount: 7500.00, percentage: 20.1 },
    { category: '31-60 days overdue', amount: 5000.00, percentage: 10.4 },
    { category: '61-90 days overdue', amount: 2500.00, percentage: 9.7 },
    { category: '91+ days overdue', amount: 750.00, percentage: 2.9 }
  ]

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="debtors-management">
      <div className="header">
        <h1>Debtors Management</h1>
        <div className="header-actions">
          <button className="add-btn">+ Add Debtor</button>
          <button className="export-btn">↓ Export</button>
        </div>
      </div>

      <div className="filters">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search debtors..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          <select
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Payment Status</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Overdue</option>
          </select>
          <select
            name="debtType"
            value={filters.debtType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Debt Type</option>
            <option>Room Charges</option>
            <option>Restaurant Bills</option>
            <option>Other Services</option>
          </select>
        </div>
        <div className="filter-row">
          <div className="date-range">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="date-input"
            />
            <span>to</span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="date-input"
            />
          </div>
          <div className="balance-range">
            <input
              type="number"
              placeholder="Min Balance"
              name="minBalance"
              value={filters.minBalance}
              onChange={handleFilterChange}
              className="balance-input"
            />
            <input
              type="number"
              placeholder="Max Balance"
              name="maxBalance"
              value={filters.maxBalance}
              onChange={handleFilterChange}
              className="balance-input"
            />
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card total">
          <h3>Total Amount Owed</h3>
          <p className="amount">$25,750.00</p>
        </div>
        <div className="summary-card paid">
          <h3>Total Paid (Last 30 Days)</h3>
          <p className="amount">$12,500.00</p>
        </div>
        <div className="summary-card overdue">
          <h3>Overdue Amounts</h3>
          <p className="amount">$5,250.00</p>
        </div>
      </div>

      <div className="debtors-table">
        <table>
          <thead>
            <tr>
              <th>DEBTOR ID</th>
              <th>DEBTOR NAME</th>
              <th>CONTACT INFO</th>
              <th>OUTSTANDING BALANCE</th>
              <th>INVOICE DATE</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
              <th>DEBT TYPE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {debtors.map((debtor) => (
              <tr key={debtor.id}>
                <td>{debtor.id}</td>
                <td>{debtor.name}</td>
                <td>{debtor.contact}</td>
                <td>${debtor.balance.toFixed(2)}</td>
                <td>{debtor.invoiceDate}</td>
                <td>{debtor.dueDate}</td>
                <td>
                  <span className={`status-badge ${debtor.status.toLowerCase()}`}>
                    {debtor.status}
                  </span>
                </td>
                <td>{debtor.debtType}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">👁️</button>
                    <button className="action-btn">✏️</button>
                    <button className="action-btn delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="aging-report">
        <h2>Debt Aging Report</h2>
        <table>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>AMOUNT</th>
              <th>PERCENTAGE</th>
            </tr>
          </thead>
          <tbody>
            {agingReport.map((item) => (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .debtors-management {
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

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .export-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .filters {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .search-row,
        .filter-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .search-row {
          margin-bottom: 15px;
        }

        .search-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 150px;
        }

        .date-range,
        .balance-range {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .date-input,
        .balance-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .summary-cards {
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

        .summary-card h3 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 10px 0 0 0;
        }

        .summary-card.total .amount {
          color: #1a73e8;
        }

        .summary-card.paid .amount {
          color: #1e8e3e;
        }

        .summary-card.overdue .amount {
          color: #d32f2f;
        }

        .debtors-table,
        .aging-report {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .aging-report h2 {
          padding: 20px;
          margin: 0;
          border-bottom: 1px solid #eee;
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

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-badge.pending {
          background-color: #fef7e0;
          color: #f9ab00;
        }

        .status-badge.paid {
          background-color: #e6f4ea;
          color: #1e8e3e;
        }

        .status-badge.overdue {
          background-color: #fde7e7;
          color: #d32f2f;
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
          font-size: 16px;
        }

        .action-btn.delete {
          color: #d32f2f;
        }
      `}</style>
    </div>
  )
}