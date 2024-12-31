import React, { useEffect, useState } from "react";
import { ChevronDown, AlertTriangle, FileText, FileSpreadsheet, PieChart } from 'lucide-react';
import axios from "axios";
export default function RoomOccupancyDashboard() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedRoomType, setSelectedRoomType] = useState("All Room Types");
  const [selectedFloor, setSelectedFloor] = useState("All Floors");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchRoomData();
  }, []);
  
  
  const fetchRoomData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get("http://localhost:3002/rooms");
      setRoomData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data, regardless of success or failure
    }
}
  
  const damagedRooms = roomData
  .filter(room => room.status === 'Damaged')
  .map(room => ({
    roomNumber: room.roomNumber,
    roomType: room.type,
    priority: room.priority || 'Low', // Assuming priority is not in the original data, defaulting to 'Low'
    issue: `Room ${room.roomNumber} is damaged and needs repair.`,
    reportedDate: new Date().toLocaleDateString(), // Using current date as we don't have this in the original data
    expectedRepair: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() // Setting expected repair date to 7 days from now
  }));
  
  return (
    <div className="room-occupancy-dashboard">
      {loading && ( // Conditionally render loading indicator
        <div className="loading">Loading...</div>
      )}
      <h1>Room Occupancy Dashboard</h1>

      <div className="filters">
        <div className="select-wrapper">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <ChevronDown className="select-icon" size={20} />
        </div>
        <div className="select-wrapper">
          <select
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
          >
            <option>All Room Types</option>
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
          </select>
          <ChevronDown className="select-icon" size={20} />
        </div>
        <div className="select-wrapper">
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
          >
            <option>All Floors</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <ChevronDown className="select-icon" size={20} />
        </div>
        <div className="select-wrapper">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Occupied</option>
            <option>Vacant</option>
            <option>Damaged</option>
          </select>
          <ChevronDown className="select-icon" size={20} />
        </div>
      </div>

      <div className="occupancy-overview">
        <h2>Real-Time Occupancy Overview</h2>
        <div className="overview-grid">
          <div className="overview-card blue">
            <h3>Total Rooms</h3>
            <p>{roomData.length}</p>
          </div>
          <div className="overview-card green">
            <h3>Occupied Rooms</h3>
            <p>{roomData.filter(room => room.status === 'Occupied').length}</p>
          </div>
          <div className="overview-card yellow">
            <h3>Vacant Rooms</h3>
            <p>{roomData.filter(room => room.status === 'Vacant').length}</p>
          </div>
          <div className="overview-card red">
            <h3>Damaged Rooms</h3>
            <p>{roomData.filter(room => room.status === 'Damaged').length}</p>
          </div>
        </div>
        <div className="occupancy-rate">
          <h3>Occupancy Rate</h3>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ 
                width: `${(roomData.filter(room => room.status === 'Occupied').length / roomData.length) * 100}%` 
              }}
            ></div>
          </div>
          <p className="rate-value">
            {((roomData.filter(room => room.status === 'Occupied').length / roomData.length) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="room-status">
        <h2>Room Status</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Floor</th>
                <th>Status</th>
                <th>Days Occupied (Monthly)</th>
                <th>Price Per Night</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.type}</td>
                  <td>{room.floor}</td>
                  <td>
                    <span
                      className={`status-badge ${room.status.toLowerCase()}`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td>{room.days_Occupied}</td>
                  <td>{room.pricePerNight}</td>
                  <td>
                    <div className="usage-bar">
                      <div
                        className="usage-progress"
                        style={{ width: `${room.usage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="room-usage-analytics">
          <h2>Room Usage Analytics</h2>
          <div className="analytics-section">
            <h3>Most Frequently Occupied Rooms</h3>
            <ul>
              <li>
                <span>Room 101 (Single)</span>
                <span className="occupancy high">95% Occupancy</span>
              </li>
              <li>
                <span>Room 205 (Double)</span>
                <span className="occupancy high">92% Occupancy</span>
              </li>
              <li>
                <span>Room 310 (Suite)</span>
                <span className="occupancy high">90% Occupancy</span>
              </li>
            </ul>
          </div>
          <div className="analytics-section">
            <h3>Least Frequently Occupied Rooms</h3>
            <ul>
              <li>
                <span>Room 402 (Single)</span>
                <span className="occupancy low">30% Occupancy</span>
              </li>
              <li>
                <span>Room 115 (Double)</span>
                <span className="occupancy low">35% Occupancy</span>
              </li>
              <li>
                <span>Room 220 (Suite)</span>
                <span className="occupancy low">40% Occupancy</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="damaged-room-tracking">
          <h2>Damaged Room Tracking</h2>
          {damagedRooms.length > 0 ? (
            damagedRooms.map((room) => (
              <div key={room.roomNumber} className="damaged-room">
                <div className="room-header">
                  <h3>
                    Room {room.roomNumber} ({room.roomType})
                  </h3>
                  <span
                    className={`priority-badge ${room.priority.toLowerCase()}`}
                  >
                    {room.priority} Priority
                  </span>
                </div>
                <p className="issue">{room.issue}</p>
                <p className="date">Reported: {room.reportedDate}</p>
                <p className="date">Expected Repair: {room.expectedRepair}</p>
              </div>
            ))
          ) : (
            <p>No damaged rooms to report.</p>
          )}
        </div>
      </div>

      <div className="room-condition-summary">
        <h2>Room Condition Summary</h2>
        <div className="summary-grid">
          <div className="summary-card red">
            <h3>Total Damaged Rooms</h3>
            <p>5</p>
          </div>
          <div className="summary-card green">
            <h3>Recently Repaired Rooms</h3>
            <p>3</p>
          </div>
          <div className="summary-card yellow">
            <h3>Rooms Awaiting Inspection</h3>
            <p>7</p>
          </div>
        </div>
      </div>

      <div className="alerts">
        <h2>Alerts</h2>
        <ul>
          <li className="alert-item red">
            <AlertTriangle size={20} />
            <span>2 high priority repairs needed</span>
          </li>
          <li className="alert-item yellow">
            <AlertTriangle size={20} />
            <span>3 rooms vacant for over 30 days</span>
          </li>
          <li className="alert-item blue">
            <AlertTriangle size={20} />
            <span>5 rooms scheduled for repair in the next 7 days</span>
          </li>
        </ul>
      </div>

      <div className="export-options">
        <h2>Export and Reporting Options</h2>
        <div className="button-group">
          <button className="export-button blue">
            <FileText size={20} />
            Generate PDF Report
          </button>
          <button className="export-button green">
            <FileSpreadsheet size={20} />
            Export to Excel
          </button>
          <button className="export-button purple">
            <PieChart size={20} />
            Custom Analytics Report
          </button>
        </div>
      </div>

      <style>{`
        .room-occupancy-dashboard {
          font-family: Arial, sans-serif;
          padding: 24px;
          background-color: #f5f5f5;
          min-height: 100vh;
        }

        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        h2 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .filters {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .select-wrapper {
          position: relative;
          width: 200px;
        }

        .select-wrapper select {
          width: 100%;
          padding: 8px 32px 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background-color: white;
          appearance: none;
          cursor: pointer;
        }

        .select-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #9ca3af;
        }

        .occupancy-overview, .room-status, .room-usage-analytics, .damaged-room-tracking, .room-condition-summary, .alerts, .export-options {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .overview-grid, .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .overview-card, .summary-card {
          padding: 16px;
          border-radius: 8px;
        }

        .overview-card h3, .summary-card h3 {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .overview-card p, .summary-card p {
          font-size: 24px;
          font-weight: bold;
        }

        .blue { background-color: #e8f0fe; color: #1a73e8; }
        .green { background-color: #e6f4ea; color: #1e8e3e; }
        .yellow { background-color: #fef7e0; color: #f9ab00; }
        .red { background-color: #fce8e6; color: #d93025; }
        .purple { background-color: #f3e8fd; color: #9334e6; }

        .occupancy-rate {
          margin-top: 16px;
        }

        .progress-bar {
          height: 16px;
          background-color: #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background-color: #1a73e8;
        }

        .rate-value {
          text-align: right;
          font-size: 14px;
          color: #4b5563;
          margin-top: 4px;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 500;
          color: #4b5563;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          color: white; /* Updated CSS */
        }

        .status-badge.occupied { background-color: #1e8e3e; } /* Updated CSS */
        .status-badge.vacant { background-color: #f9ab00; } /* Updated CSS */
        .status-badge.damaged { background-color: #d93025; } /* Updated CSS */

        .usage-bar {
          width: 96px;
          height: 8px;
          background-color: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .usage-progress {
          height: 100%;
          background-color: #1a73e8;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .analytics-section {
          margin-bottom: 16px;
        }

        .analytics-section h3 {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .analytics-section ul {
          list-style-type: none;
          padding: 0;
        }

        .analytics-section li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .occupancy {
          font-weight: 500;
        }

        .occupancy.high { color: #1e8e3e; }
        .occupancy.low { color: #d93025; }

        .damaged-room {
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .damaged-room:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .room-header h3 {
          font-size: 14px;
          font-weight: 500;
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }

        .priority-badge.high { background-color: #d93025; color: white; } /* Updated CSS */
        .priority-badge.medium { background-color: #f9ab00; color: white; } /* Updated CSS */
        .priority-badge.low { background-color: #1e8e3e; color: white; } /* Updated CSS */

        .issue {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .date {
          font-size: 12px;
          color: #6b7280;
        }

        .alerts ul {
          list-style-type: none;
          padding: 0;
        }

        .alert-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .alert-item svg {
          margin-right: 12px;
        }

        .alert-item.red { color: #d93025; }
        .alert-item.yellow { color: #f9ab00; }
        .alert-item.blue { color: #1a73e8; }

        .button-group {
          display: flex;
          gap: 16px;
        }

        .export-button {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .export-button svg {
          margin-right: 8px;
        }

        .export-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .export-button.blue { background-color: #1a73e8; color: white; }
        .export-button.green { background-color: #1e8e3e; color: white; }
        .export-button.purple { background-color: #9334e6; color: white; }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 24px;
          color: #4b5563;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
          }

          .select-wrapper {
            width: 100%;
          }

          .overview-grid, .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

