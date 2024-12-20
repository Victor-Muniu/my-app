import React, { useState } from 'react'

export default function PayrollDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  

  const employees = [
    {
      id: 'EMP001',
      name: 'Jane Smith',
      department: 'Front Desk',
      position: 'Receptionist',
      status: 'Active'
    },
    {
      id: 'EMP002',
      name: 'John Doe',
      department: 'Housekeeping',
      position: 'Supervisor',
      status: 'Active'
    }
  ]

  return (
    <div className="payroll-dashboard">
      <header className="header">
        <h1>Hotel Payroll System</h1>
        <nav>
          <a href="#" className="active">Dashboard</a>
          <a href="#">Employees</a>
          <a href="#">Payroll</a>
          <a href="#">Reports</a>
          <a href="#">Settings</a>
        </nav>
        <div className="user-profile">
          <span>John Doe</span>
          <div className="avatar">👤</div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="quick-actions card">
          <h2>Quick Actions</h2>
          <div className="action-links">
            <a href="#" className="action-link">Process Payroll</a>
            <a href="#" className="action-link">Add New Employee</a>
            <a href="#" className="action-link">Generate Reports</a>
            <a href="#" className="action-link">View Tax Filings</a>
          </div>
        </div>

        <div className="payroll-summary card">
          <h2>Payroll Summary</h2>
          <div className="summary-content">
            <div className="summary-item">
              <label>Next Payroll Date:</label>
              <span>July 31, 2025</span>
            </div>
            <div className="summary-item">
              <label>Employees:</label>
              <span>150</span>
            </div>
            <div className="summary-item">
              <label>Total Gross:</label>
              <span>$450,000</span>
            </div>
            <div className="summary-item">
              <label>Total Deductions:</label>
              <span>$95,000</span>
            </div>
            <div className="summary-item">
              <label>Total Net Pay:</label>
              <span>$355,000</span>
            </div>
          </div>
        </div>

        <div className="notifications card">
          <h2>Notifications</h2>
          <div className="notification-list">
            <div className="notification warning">
              <span>⚠️</span> Tax filing due in 5 days
            </div>
            <div className="notification success">
              <span>✅</span> June payroll processed successfully
            </div>
            <div className="notification info">
              <span>ℹ️</span> 3 new employees added this month
            </div>
          </div>
        </div>
      </div>

      <div className="employee-management card">
        <div className="section-header">
          <h2>Employee Management</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="add-btn">Add Employee</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <span className={`status ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">Edit</button>
                    <button className="action-btn">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Showing 1-2 of 150 employees</span>
          <div className="pagination-controls">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      <div className="payroll-processing card">
        <h2>Payroll Processing</h2>
        <div className="processing-grid">
          <div className="payroll-details">
            <h3>Payroll Details</h3>
            <div className="details-form">
              <div className="form-group">
                <label>Pay Period</label>
                <input type="text" value="July 1-15, 2025" readOnly />
              </div>
              <div className="form-group">
                <label>Payment Date</label>
                <input type="text" value="31/07/2025" readOnly />
              </div>
              <div className="button-group">
                <button className="primary-btn">Process Payroll</button>
                <button className="secondary-btn">Preview</button>
              </div>
            </div>
          </div>
          <div className="payroll-summary">
            <h3>Payroll Summary</h3>
            <div className="summary-list">
              <div className="summary-item">
                <label>Total Employees:</label>
                <span>150</span>
              </div>
              <div className="summary-item">
                <label>Total Hours:</label>
                <span>12,000</span>
              </div>
              <div className="summary-item">
                <label>Total Overtime Hours:</label>
                <span>450</span>
              </div>
              <div className="summary-item">
                <label>Total Gross Pay:</label>
                <span>$450,000</span>
              </div>
              <div className="summary-item">
                <label>Total Deductions:</label>
                <span>$95,000</span>
              </div>
              <div className="summary-item">
                <label>Total Net Pay:</label>
                <span>$355,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reports-analytics card">
        <h2>Reports & Analytics</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Payroll Cost Breakdown</h3>
            <div className="chart-placeholder">Pie Chart Placeholder</div>
          </div>
          <div className="chart-card">
            <h3>Employee Distribution</h3>
            <div className="chart-placeholder">Bar Chart Placeholder</div>
          </div>
          <div className="chart-card">
            <h3>Overtime Trends</h3>
            <div className="chart-placeholder">Line Chart Placeholder</div>
          </div>
        </div>
        <div className="generate-reports">
          <h3>Generate Reports</h3>
          <div className="report-buttons">
            <button className="report-btn">Salary Statement</button>
            <button className="report-btn">Tax Report</button>
            <button className="report-btn">Deductions Summary</button>
            <button className="report-btn">Custom Report</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payroll-dashboard {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: white;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        nav {
          display: flex;
          gap: 20px;
        }

        nav a {
          text-decoration: none;
          color: #666;
        }

        nav a.active {
          color: #1a73e8;
          font-weight: 500;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .action-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-link {
          color: #1a73e8;
          text-decoration: none;
        }

        .summary-content {
          display: grid;
          gap: 10px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
        }

        .notification-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .notification {
          padding: 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notification.warning {
          background: #fff3dc;
          color: #875000;
        }

        .notification.success {
          background: #e6f4ea;
          color: #1e8e3e;
        }

        .notification.info {
          background: #e8f0fe;
          color: #1a73e8;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .controls {
          display: flex;
          gap: 10px;
        }

        .search-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
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

        .status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status.active {
          background: #e6f4ea;
          color: #1e8e3e;
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
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
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

        .processing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .details-form {
          display: grid;
          gap: 15px;
        }

        .form-group {
          display: grid;
          gap: 5px;
        }

        .form-group input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .primary-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .secondary-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .chart-placeholder {
          height: 200px;
          background: #f5f5f5;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .report-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .report-btn {
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