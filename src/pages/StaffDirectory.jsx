import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function StaffDirectory() {

  const [staffData, setStaffData] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: 'All Departments',
    status: 'All Statuses',
    role: 'All Roles',
    date: ''
  });

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/staff');
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [isAddCardVisible, setIsAddCardVisible] = useState(false)
  const [newStaff, setNewStaff] = useState({
    fname: '',
    lname: '',
    role: '',
    department: '',
    status: '',
    email: '',
    password: '',
    emp_no: ''
  })
  const handleAddStaff = async () => {
    try {
      await axios.post('http://localhost:3002/staff', newStaff);
      console.log('Staff data successfully posted!');
      fetchStaffData(); 
    } catch (error) {
      console.error("Error adding new staff:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  


  

  return (
    <div className="staff-directory">
      <div className="header">
        <h1>Staff Directory</h1>
      </div>

      <div className="controls">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search staff..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          
          <div className="filters">
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option>All Departments</option>
              <option>HR</option>
              <option>ICT</option>
              <option>Accounts</option>
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Terminated</option>
            </select>

            <select
              name="jobTitle"
              value={filters.jobTitle}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option>All Job Titles</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>Analyst</option>
            </select>

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="filter-select"
            />
          </div>
        </div>

        <button className="add-staff-btn" onClick={() => setIsAddCardVisible(true)}>+ Add Staff</button>
      </div>
{isAddCardVisible && (
        <div className="add-staff-card">
          <h2>Add New Staff Member</h2>
          <form onSubmit={handleAddStaff}>
            <div className="form-group">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={newStaff.fname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={newStaff.lname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={newStaff.role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={newStaff.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="ICT">ICT</option>
                <option value="Accounts">Accounts</option>
                <option value="Food and Beverage Production">Food and Beverage Production</option>
                <option value="Food and Beverage Service">Food and Beverage Service</option>
                <option value="Store">Store</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={newStaff.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newStaff.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newStaff.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_no">Employee Number:</label>
              <input
                type="text"
                id="emp_no"
                name="emp_no"
                value={newStaff.emp_no}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Staff</button>
              <button type="button" className="cancel-btn" onClick={() => setIsAddCardVisible(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="staff-table">
        <table>
          <thead>
            <tr>
              <th>EMP NO</th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>DEPARTMENT</th>
              <th>EMAIL</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.emp_no}</td>
                <td>{staff.fname} {staff.lname}</td>
                <td>{staff.role}</td>
                <td>{staff.department}</td>
                <td>{staff.email}</td>
                
                <td>
                  <span className={`status-badge ${staff.status.toLowerCase().replace(' ', '-')}`}>
                    {staff.status}
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

      <div className="pagination">
        <span>Showing 1 to 10 of 97 results</span>
        <div className="pagination-controls">
          <button disabled>Previous</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>Next</button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Our Organization. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .staff-directory {
          padding: 20px;
          background-color: #f5f5f5;
          position: relative;
        }

        .header {
          margin-bottom: 20px;
        }

        .header h1 {
          font-size: 24px;
          color: #333;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 20px;
        }

        .search-filters {
          flex: 1;
        }

        .search-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .add-staff-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
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

        .add-staff-card {
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

        .add-staff-card h2 {
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

        .staff-table {
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

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-badge.active {
          background-color: #e6f4ea;
          color: #1e8e3e;
        }

        .status-badge.on-leave {
          background-color: #fef7e0;
          color: #f9ab00;
        }

        .status-badge.terminated {
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

        .footer {
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}