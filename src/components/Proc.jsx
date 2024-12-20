import React from 'react'
import {ChevronUp} from 'lucide-react'
function Proc() {
  return (
    
    <main className="main-content">
    <h2 className="page-title">Procurement Dashboard</h2>
    
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-header">Total Spend</div>
        <div className="metric-value">$1,234,567</div>
        <div className="metric-change positive">
          <ChevronUp size={16} />
          5.3% from last month
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-header">Pending Requisitions</div>
        <div className="metric-value orange">23</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: '65%', backgroundColor: '#ff7043' }}></div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-header">LPO Status</div>
        <div className="lpo-stats">
          <div className="lpo-stat">
            <span className="stat-label">Approved</span>
            <span className="stat-value green">65%</span>
          </div>
          <div className="lpo-stat">
            <span className="stat-label">Pending</span>
            <span className="stat-value orange">25%</span>
          </div>
          <div className="lpo-stat">
            <span className="stat-label">Completed</span>
            <span className="stat-value blue">10%</span>
          </div>
        </div>
      </div>
    </div>

    <div className="charts-grid">
      <div className="chart-card">
        <h3>Supplier Performance</h3>
        <div className="chart-placeholder">
          Bar chart showing supplier performance metrics
        </div>
      </div>

      <div className="chart-card">
        <h3>Inventory Levels</h3>
        <div className="chart-placeholder">
          Bar chart showing inventory levels for key supplies
        </div>
      </div>
    </div>

    <div className="chart-card full-width">
      <h3>Budget vs. Actual</h3>
      <div className="chart-placeholder">
        Line graph comparing allocated budget with actual spending
      </div>
    </div>
    <style jsx>{`
        .main-content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #1a1f36;
          margin-bottom: 24px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .metric-header {
          font-size: 14px;
          color: #4a5568;
          margin-bottom: 8px;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 600;
          color: #1a1f36;
          margin-bottom: 8px;
        }

        .metric-value.orange {
          color: #ff7043;
        }

        .metric-change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
        }

        .metric-change.positive {
          color: #22c55e;
        }

        .progress-bar {
          height: 8px;
          background-color: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .lpo-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        }

        .lpo-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: #4a5568;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 600;
        }

        .stat-value.green { color: #22c55e; }
        .stat-value.orange { color: #ff7043; }
        .stat-value.blue { color: #3b82f6; }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .chart-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .chart-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1f36;
          margin-bottom: 16px;
        }

        .chart-placeholder {
          background-color: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 6px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-size: 14px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        @media (max-width: 768px) {
          .dashboard {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            padding: 12px;
          }

          .main-content {
            padding: 16px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
    `}</style>
  </main>
  )
}

export default Proc