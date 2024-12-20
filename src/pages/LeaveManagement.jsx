import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function LeaveManagement() {
  const [filters, setFilters] = useState({
    search: '',
    department: 'All Departments',
    dateRange: ''
  })

  const [calendarView, setCalendarView] = useState('Month')

  const [staffData, setStaffData] = useState([]);
  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/staff-off');
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const [leaveData, setLeaveData] = useState([])
  useEffect(() =>{
    fetchLeaveData();
  })
  const fetchLeaveData = async ( ) =>{
    try {
      const response = await axios.get('http://localhost:3002/leave-applications');
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  }

  const leaveRequests = [
    {
      id: 1,
      employee: {
        name: 'John Doe',
        id: 'EMP001',
        department: 'Front Office',
        avatar: '/placeholder.svg?height=32&width=32'
      },
      type: 'Annual Leave',
      date: 'May 15, 2025 - May 20, 2025',
      reason: 'Family vacation'
    },
    {
      id: 2,
      employee: {
        name: 'Alice Johnson',
        id: 'EMP003',
        department: 'Food & Beverage',
        avatar: '/placeholder.svg?height=32&width=32'
      },
      type: 'Sick Leave',
      date: 'June 5, 2025',
      reason: 'Medical appointment'
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
    <div className="leave-management">
      <div className="header">
        <h1>Leave and Off-Day Management</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search employee..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="department-select"
          >
            <option>All Departments</option>
            <option>Front Office</option>
            <option>Housekeeping</option>
            <option>Food & Beverage</option>
          </select>
          <input
            type="date"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="date-input"
          />
        </div>
      </div>

      <section className="employee-overview">
        <div className="section-header">
          <h2>Employee Overview</h2>
          <button className="add-btn">+ Add Employee</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>ROLE</th>
              <th>WEEKLY OFF</th>
              <th>ANNUAL LEAVE</th>
              <th>HOLIDAY OFF</th>
              <th>MATERNITY LEAVE</th>
              <th>PATERNITY LEAVE</th>
              <th>SICK LEAVE</th>
              <th>PENDING REQUESTS</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <div className="employee-info">
                    <div>
                      <div className="employee-name">{employee.staffID.fname} {employee.staffID.lname}</div>
                    </div>
                  </div>
                </td>
                <td>{employee.staffID.role}</td>
                <td>{employee.weeklyOff}</td>
                <td>{employee.annualLeave}</td>
                <td>{employee.holidayOff[0]}</td>
                <td>{employee.maternityLeave}</td>
                <td>{employee.paternityLeave}</td>
                <td>{employee.sickLeave}</td>
                <td>
                  <span className={`status-badge ${employee.pending_request === 'No Requests' ? 'success' : 'warning'}`}>
                    {employee.pending_request}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="leave-requests">
        <h2>Leave Requests</h2>
        <div className="requests-list">
          {leaveData.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <div className="employee-info">
                  <img src="👋" alt="" className="avatar" />
                  <div>
                    <div className="employee-name">{request.staffID.fname} {request.staffID.lname}</div>
                    <div className="employee-dept">{request.staffID.emp_no} - {request.staffID.department}</div>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="approve-btn">✓ Approve</button>
                  <button className="reject-btn">✕ Reject</button>
                </div>
              </div>
              <div className="request-details">
                <div>{request.leaveType}: {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</div>
                <div className="request-reason">Reason: {request.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="calendar-view">
        <div className="section-header">
          <h2>Calendar View</h2>
          <div className="view-controls">
            <button
              className={`view-btn ${calendarView === 'Day' ? 'active' : ''}`}
              onClick={() => setCalendarView('Day')}
            >
              Day
            </button>
            <button
              className={`view-btn ${calendarView === 'Week' ? 'active' : ''}`}
              onClick={() => setCalendarView('Week')}
            >
              Week
            </button>
            <button
              className={`view-btn ${calendarView === 'Month' ? 'active' : ''}`}
              onClick={() => setCalendarView('Month')}
            >
              Month
            </button>
          </div>
        </div>
        <div className="calendar-grid">
          <div className="calendar-header">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-body">
            {Array(35).fill(null).map((_, index) => (
              <div key={index} className="calendar-cell">
                {index >= 4 && index <= 6 && (
                  <div className="leave-indicator">
                    John Doe - Annual Leave
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reporting">
        <div className="section-header">
          <h2>Reporting</h2>
          <button className="export-btn">↓ Export Report</button>
        </div>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Leave by Department</h3>
            <div className="chart-placeholder">Pie chart placeholder</div>
          </div>
          <div className="chart-card">
            <h3>Leave Trends</h3>
            <div className="chart-placeholder">Line chart placeholder</div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Hotel Leave Management System. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .leave-management {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-controls {
          display: flex;
          gap: 10px;
        }

        .search-input,
        .department-select,
        .date-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .search-input {
          width: 250px;
        }

        section {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
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

        th {
          background-color: #f8f9fa;
          font-weight: 500;
          color: #666;
        }

        .employee-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 16px;
        }

        .employee-id {
          font-size: 12px;
          color: #666;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-badge.warning {
          background: #fef7e0;
          color: #f9ab00;
        }

        .status-badge.success {
          background: #e6f4ea;
          color: #1e8e3e;
        }

        .requests-list {
          display: grid;
          gap: 15px;
        }

        .request-card {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .request-actions {
          display: flex;
          gap: 8px;
        }

        .approve-btn,
        .reject-btn {
          padding: 6px 12px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .approve-btn {
          background: #e6f4ea;
          color: #1e8e3e;
        }

        .reject-btn {
          background: #fde7e7;
          color: #d32f2f;
        }

        .request-details {
          font-size: 14px;
          color: #666;
        }

        .view-controls {
          display: flex;
          gap: 5px;
        }

        .view-btn {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .view-btn.active {
          background: #1a73e8;
          color: white;
          border-color: #1a73e8;
        }

        .calendar-grid {
          border: 1px solid #eee;
          border-radius: 8px;
        }

        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background: #f8f9fa;
          padding: 10px;
          text-align: center;
          font-weight: 500;
        }

        .calendar-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .calendar-cell {
          min-height: 100px;
          border: 1px solid #eee;
          padding: 8px;
        }

        .leave-indicator {
          background: #e8f0fe;
          color: #1a73e8;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .chart-card {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
        }

        .chart-placeholder {
          height: 200px;
          background: #f8f9fa;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          margin-top: 15px;
        }

        .export-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        footer {
          text-align: center;
          color: #666;
          margin-top: 40px;
        }
      `}</style>
    </div>
  )
}