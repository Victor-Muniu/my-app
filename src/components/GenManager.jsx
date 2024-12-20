import React, {useState} from "react";

function GenManager() {
    const [dateRange, setDateRange] = useState('Today')
    const recentActivities = [
        {
          time: '10:30 AM',
          activity: 'New reservation: Room 301',
          status: 'Confirmed'
        }
      ]
  return (
    <main className="main-content">
      <div className="overview-section">
        <div className="section-header">
          <h2>Overview</h2>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
        </div>

        <div className="metrics-grid">
          <div className="metric-card occupancy">
            <h3>Current Occupancy Rate</h3>
            <div className="metric-value">78%</div>
            <div className="metric-subtitle">156 / 200 rooms occupied</div>
          </div>

          <div className="metric-card revenue">
            <h3>Daily Revenue</h3>
            <div className="metric-value">$24,580</div>
            <div className="metric-subtitle positive">+12% from yesterday</div>
          </div>

          <div className="metric-card satisfaction">
            <h3>Guest Satisfaction Score</h3>
            <div className="metric-value">4.7 / 5.0</div>
            <div className="metric-subtitle">Based on 127 reviews</div>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card reservations">
            <h3>Total Reservations</h3>
            <div className="metric-value">89</div>
            <div className="metric-subtitle">
              32 check-ins, 28 check-outs today
            </div>
          </div>

          <div className="metric-card maintenance">
            <h3>Pending Maintenance Tickets</h3>
            <div className="metric-value">7</div>
            <div className="metric-subtitle">3 high priority</div>
          </div>
        </div>
      </div>

      <div className="revenue-section">
        <h2>Revenue by Department</h2>
        <div className="chart-placeholder">Revenue by Department Chart</div>
      </div>

      <div className="activities-section">
        <h2>Recent Activities</h2>
        <table className="activities-table">
          <thead>
            <tr>
              <th>TIME</th>
              <th>ACTIVITY</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.time}</td>
                <td>{activity.activity}</td>
                <td>
                  <span className={`status ${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
          }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .date-range-select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .metric-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .metric-card h3 {
            margin: 0;
            font-size: 14px;
            color: #666;
          }

          .metric-value {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
            color: #333;
          }

          .metric-subtitle {
            font-size: 14px;
            color: #666;
          }

          .metric-subtitle.positive {
            color: #34a853;
          }

          .revenue-section,
          .activities-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .chart-placeholder {
            height: 300px;
            background: #f5f5f5;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
          }

          .activities-table {
            width: 100%;
            border-collapse: collapse;
          }

          .activities-table th,
          .activities-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }

          .activities-table th {
            font-weight: 500;
            color: #666;
          }

          .status {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
          }

          .status.confirmed {
            background: #e6f4ea;
            color: #1e8e3e;
          }
        `}
      </style>
    </main>
  );
}

export default GenManager;
