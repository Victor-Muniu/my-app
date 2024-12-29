import React from "react";

function Service() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button className="notifications-btn">
            <span className="notifications-icon">🔔</span>
            <span className="notifications-label">Notifications</span>
          </button>
          <button className="new-order-btn">
            <span className="plus-icon">+</span>
            New Order
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card active-tables">
          <div className="metric-icon">
            <span>⬚</span>
          </div>
          <div className="metric-content">
            <h3>Active Tables</h3>
            <div className="metric-value">
              <strong>24</strong>/30
            </div>
            <p className="metric-subtitle">6 tables available</p>
          </div>
        </div>

        <div className="metric-card active-orders">
          <div className="metric-icon">
            <span>🍽️</span>
          </div>
          <div className="metric-content">
            <h3>Active Orders</h3>
            <div className="metric-value">47</div>
            <p className="metric-subtitle">12 pending</p>
          </div>
        </div>

        <div className="metric-card revenue">
          <div className="metric-icon">
            <span>📈</span>
          </div>
          <div className="metric-content">
            <h3>Today's Revenue</h3>
            <div className="metric-value">$4,290</div>
            <p className="metric-subtitle positive">↑ 2.4% from yesterday</p>
          </div>
        </div>

        <div className="metric-card rating">
          <div className="metric-icon">
            <span>⭐</span>
          </div>
          <div className="metric-content">
            <h3>Avg. Rating</h3>
            <div className="metric-value">4.8/5.0</div>
            <p className="metric-subtitle">Based on 142 reviews</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="active-orders-section">
          <div className="section-header">
            <h2>Active Orders</h2>
            <a href="#" className="view-all">
              View All
            </a>
          </div>
          <div className="orders-list">
            <div className="order-item">
              <div className="order-icon">#</div>
              <div className="order-info">
                <h4>Table 12 - Order #4829</h4>
                <p>6 items • 12:45 PM</p>
              </div>
              <span className="order-status in-progress">In Progress</span>
            </div>

            <div className="order-item">
              <div className="order-icon">#</div>
              <div className="order-info">
                <h4>Table 8 - Order #4528</h4>
                <p>3 items • 12:42 PM</p>
              </div>
              <span className="order-status ready">Ready to Serve</span>
            </div>

            <div className="order-item">
              <div className="order-icon">#</div>
              <div className="order-info">
                <h4>Table 15 - Order #4527</h4>
                <p>6 items • 12:38 PM</p>
              </div>
              <span className="order-status in-progress">In Progress</span>
            </div>
          </div>
        </section>

        <section className="notifications-section">
          <div className="section-header">
            <h2>Recent Notifications</h2>
            <a href="#" className="view-all">
              View All
            </a>
          </div>
          <div className="notifications-list">
            <div className="notification-item urgent">
              <div className="notification-icon">⚠️</div>
              <div className="notification-content">
                <h4>Low stock alert</h4>
                <p>White wine inventory below threshold</p>
                <span className="notification-time">2 mins ago</span>
              </div>
            </div>

            <div className="notification-item success">
              <div className="notification-icon">✓</div>
              <div className="notification-content">
                <h4>Order completed</h4>
                <p>Table 7 order has been served</p>
                <span className="notification-time">5 mins ago</span>
              </div>
            </div>

            <div className="notification-item info">
              <div className="notification-icon">📅</div>
              <div className="notification-content">
                <h4>New reservation</h4>
                <p>Table 15 at 7:30 PM</p>
                <span className="notification-time">20 mins ago</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <style jsx>{`
        :root {
          --primary-color: #6366f1;
          --primary-light: #818cf8;
          --success-color: #22c55e;
          --warning-color: #f59e0b;
          --danger-color: #ef4444;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --border-color: #e2e8f0;
        }

        .dashboard {
          padding: 24px;
          background-color: var(--bg-secondary);
          min-height: 100vh;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .dashboard-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .notifications-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notifications-btn:hover {
          background: var(--bg-secondary);
        }

        .new-order-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .new-order-btn:hover {
          background: var(--primary-light);
        }

        .plus-icon {
          font-size: 18px;
          font-weight: 600;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: var(--bg-primary);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: var(--bg-secondary);
        }

        .active-tables .metric-icon {
          color: var(--primary-color);
          background: #e0e7ff;
        }

        .active-orders .metric-icon {
          color: var(--warning-color);
          background: #fef3c7;
        }

        .revenue .metric-icon {
          color: var(--success-color);
          background: #dcfce7;
        }

        .rating .metric-icon {
          color: #f59e0b;
          background: #fef3c7;
        }

        .metric-content {
          flex: 1;
        }

        .metric-content h3 {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          margin: 0 0 8px 0;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .metric-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .metric-subtitle.positive {
          color: var(--success-color);
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .view-all {
          color: var(--primary-color);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .orders-list,
        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-item {
          background: var(--bg-primary);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .order-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--primary-color);
        }

        .order-info {
          flex: 1;
        }

        .order-info h4 {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .order-info p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .order-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .order-status.in-progress {
          background: #fef3c7;
          color: var(--warning-color);
        }

        .order-status.ready {
          background: #dcfce7;
          color: var(--success-color);
        }

        .notification-item {
          background: var(--bg-primary);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .notification-item.urgent .notification-icon {
          background: #fee2e2;
          color: var(--danger-color);
        }

        .notification-item.success .notification-icon {
          background: #dcfce7;
          color: var(--success-color);
        }

        .notification-item.info .notification-icon {
          background: #e0e7ff;
          color: var(--primary-color);
        }

        .notification-content {
          flex: 1;
        }

        .notification-content h4 {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .notification-content p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 4px 0;
        }

        .notification-time {
          font-size: 12px;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 16px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

export default Service;
