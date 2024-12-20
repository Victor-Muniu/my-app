import React from 'react'

function Accounting() {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Hotel Accounting</h1>
      <nav className="nav-menu">
        <div className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </div>

        <div className="nav-group">
          <div className="nav-item">
            <span className="nav-icon">💰</span>
            <span>Transactions</span>
          </div>
          <div className="nav-submenu">
            <div className="nav-subitem">Purchases</div>
            <div className="nav-subitem">Expenses</div>
            <div className="nav-subitem">Sales</div>
          </div>
        </div>

        <div className="nav-group">
          <div className="nav-item">
            <span className="nav-icon">📊</span>
            <span>Accounts</span>
          </div>
          <div className="nav-submenu">
            <div className="nav-subitem">Chart of Accounts</div>
            <div className="nav-subitem">General Ledger</div>
            <div className="nav-subitem">Trial Balance</div>
          </div>
        </div>

        <div className="nav-item">
          <span className="nav-icon">🏦</span>
          <span>Banking</span>
        </div>

        <div className="nav-item">
          <span className="nav-icon">👥</span>
          <span>People</span>
        </div>

        <div className="nav-item">
          <span className="nav-icon">💵</span>
          <span>Payroll</span>
        </div>

        <div className="nav-item">
          <span className="nav-icon">📈</span>
          <span>Reports</span>
        </div>
      </nav>
      <style jsx>
        {`
          .sidebar {
            width: 250px;
            background-color: white;
            padding: 20px;
            border-right: 1px solid #e0e0e0;
          }

          .sidebar-title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
          }

          .nav-item:hover {
            background-color: #f0f0f0;
          }

          .nav-item.active {
            background-color: #e3f2fd;
            color: #1976d2;
          }

          .nav-submenu {
            margin-left: 30px;
            font-size: 0.9rem;
          }

          .nav-subitem {
            padding: 8px;
            cursor: pointer;
          }

          .nav-subitem:hover {
            background-color: #f0f0f0;
            border-radius: 5px;
          }
        `}
      </style>
    </aside>
  )
}

export default Accounting