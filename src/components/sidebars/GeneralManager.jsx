import React from "react";
import { useNavigate } from 'react-router-dom';

function GeneralManager() {
  const navigationItems = [
    { icon: "📊", label: "Overview", path: "/dashboard" },
    { icon: "🛏️", label: "Room Occupancy & Reservations", path: "/room_status" },
    { icon: "💰", label: "Revenue & Financial Summary", path: "/revenue" },
    { icon: "📈", label: "Sales by Department", path: "/sales" },
    { icon: "⭐", label: "Guest Experience and Feedback", path: "/guest-feedback" },
    { icon: "🧹", label: "Housekeeping & Maintenance", path: "/housekeeping" },
    { icon: "👥", label: "Staff Management", path: "/staff" },
    { icon: "💵", label: "Daily Collections", path: "/daily_collections" },
    { icon: "📦", label: "Inventory Management", path: "/inventory" },
    { icon: "🔧", label: "Assets & Equipment", path: "/assets" },
    { icon: "📊", label: "Reports & Analytics", path: "/reports" },
    { icon: "⚙️", label: "Settings", path: "/settings" },
  ];

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path); 
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Hotel Dashboard</h1>
      </div>
      <nav className="sidebar-nav">
        {navigationItems.map((item, index) => (
          <a
            key={index}
            onClick={() => navigateTo(item.path)}  
            className={`nav-item ${item.active ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </nav>
      <style>
        {`
          .sidebar {
            width: 250px;
            background: white;
            padding: 20px;
            border-right: 1px solid #eee;
          }

          .sidebar-header h1 {
            font-size: 20px;
            margin: 0 0 20px 0;
            color: #333;
          }

          .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            text-decoration: none;
            color: #666;
            border-radius: 4px;
            cursor: pointer;
          }

          .nav-item:hover {
            background: #f5f5f5;
          }

          .nav-item.active {
            background: #e8f0fe;
            color: #1a73e8;
          }
        `}
      </style>
    </aside>
  );
}

export default GeneralManager;
