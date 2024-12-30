import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Service = () => {
  const [uncleared, setUncleared] = useState([]);
  const [uncleared2, setUncleared2] = useState([])
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchBills();
    fetchBarBills();
    fetchCurrentUser();

  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:3002/bills", {
        withCredentials: true,
      });
      setUncleared(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const fetchBarBills = async () =>{
    try{
      const response = await axios.get("http://localhost:3002/bar-bills", {
        withCredentials: true,
      });
      setUncleared2(response.data);
    }catch (error){
      console.error("Error fetching bills:", error);
    }
  };
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3002/current-user", {
        withCredentials: true,
      });
      console.log("Fetched current user:", response.data);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const getNotClearedBills = () => {
    if (!currentUser || !currentUser.user || !currentUser.user.emp_no) {
      console.log("Current user or emp_no is undefined");
      return []; 
    }
  
    console.log("Current User Emp No:", currentUser.user.emp_no);
    console.log("Uncleared Restaurant Bills:", uncleared);
    console.log("Uncleared Bar Bills:", uncleared2);
  
    const restaurantBills = uncleared.filter(
      (bill) =>
        bill.status === "not cleared" &&
        bill.served_by?.emp_no === currentUser.user.emp_no
    );
  
    const barBills = uncleared2.filter(
      (bill) =>
        bill.status === "not cleared" &&
        bill.served_by?.emp_no === currentUser.user.emp_no
    );
  
    const allNotClearedBills = [...restaurantBills, ...barBills];
  
    console.log("Filtered Not Cleared Bills:", allNotClearedBills);
  
    return allNotClearedBills;
  };

  const canSee = () => {
    return currentUser && currentUser.emp_no && getNotClearedBills().length > 0;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-icon">⚡</span>
          <h1>Restaurant POS</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item active">
          <span className="nav-icon">◉</span>
          <span className="nav-text">Dashboard</span>
          <div className="active-indicator"></div>
        </Link>
        <Link to="/restaurant" className="nav-item">
          <span className="nav-icon">🏪</span>
          <span className="nav-text">Restaurant POS</span>
        </Link>
        <Link to="/bar" className="nav-item">
          <span className="nav-icon">🍷</span>
          <span className="nav-text">Bar POS</span>
        </Link>
        <Link to="/requisition_form" className="nav-item">
          <span className="nav-icon">📝</span>
          <span className="nav-text">Requisition Form</span>
        </Link>
        <Link to="/podium" className="nav-item">
          <span className="nav-icon">🎭</span>
          <span className="nav-text">Podium</span>
        </Link>
        <Link to="/banqueting" className="nav-item">
          <span className="nav-icon">🎪</span>
          <span className="nav-text">Banqueting</span>
        </Link>
        <Link to="/pending-bills" className="nav-item">
          <span className="nav-icon">📋</span>
          <span className="nav-text">Pending Bills</span>
          <span className="badge">
          {getNotClearedBills().length > 0 ? getNotClearedBills().length : ""}

          </span>
        </Link>
        <Link to="/kot-management" className="nav-item">
          <span className="nav-icon">⭐</span>
          <span className="nav-text">KOT Management</span>
          <span className="star">⭐</span>
        </Link>
      </nav>

      <div className="user-profile">
        <div className="avatar-container">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="John Smith"
            className="avatar"
          />
          <span className="status-indicator"></span>
        </div>
        <div className="user-info">
          <span className="user-name">John Smith</span>
          <span className="user-role">Head Waiter</span>
        </div>
        <button className="settings-button" aria-label="Settings">
          ⚙️
        </button>
      </div>
      <style jsx>
        {`
          :root {
            --primary-color: #4f46e5;
            --primary-light: #818cf8;
            --sidebar-bg: #ffffff;
            --sidebar-hover: #f8fafc;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --border-color: #e2e8f0;
            --active-gradient: linear-gradient(90deg, #4f46e5 0%, #818cf8 100%);
            --badge-gradient: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
          }

          .sidebar {
            width: 280px;
            height: 100vh;
            background-color: var(--sidebar-bg);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            padding: 24px 16px;
            position: relative;
            overflow-y: auto;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
          }

          .sidebar-header {
            margin-bottom: 32px;
            padding: 0 12px;
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .logo-icon {
            font-size: 24px;
            background: var(--active-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }

          .sidebar-header h1 {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
            letter-spacing: -0.5px;
          }

          .sidebar-nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            text-decoration: none;
            color: var(--text-secondary);
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            position: relative;
            transition: all 0.3s ease;
            margin: 2px 0;
          }

          .nav-item:hover {
            background-color: var(--sidebar-hover);
            color: var(--text-primary);
            transform: translateX(4px);
          }

          .nav-item.active {
            background-color: #f5f3ff;
            color: var(--primary-color);
          }

          .active-indicator {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 16px;
            background: var(--active-gradient);
            border-radius: 0 4px 4px 0;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .nav-item.active .active-indicator {
            opacity: 1;
          }

          .nav-icon {
            margin-right: 12px;
            font-size: 18px;
            width: 24px;
            height: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .nav-text {
            flex: 1;
          }

          .badge {
            padding: 4px 8px;
            background: var(--badge-gradient);
            color: white;
            font-size: 11px;
            border-radius: 12px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
          }

          .star {
            font-size: 14px;
            color: #fbbf24;
            filter: drop-shadow(0 1px 2px rgba(251, 191, 36, 0.2));
          }

          .user-profile {
            display: flex;
            align-items: center;
            padding: 16px;
            margin-top: 8px;
            background-color: #f8fafc;
            border-radius: 12px;
            position: relative;
          }

          .avatar-container {
            position: relative;
            margin-right: 12px;
          }

          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            object-fit: cover;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .status-indicator {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 12px;
            height: 12px;
            background-color: #22c55e;
            border: 2px solid white;
            border-radius: 50%;
          }

          .user-info {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .user-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            line-height: 1.2;
          }

          .user-role {
            font-size: 12px;
            color: var(--text-secondary);
          }

          .settings-button {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            color: var(--text-secondary);
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .settings-button:hover {
            background-color: white;
            color: var(--text-primary);
            transform: rotate(45deg);
          }

          /* Scrollbar Styling */
          .sidebar::-webkit-scrollbar {
            width: 5px;
          }

          .sidebar::-webkit-scrollbar-track {
            background: transparent;
          }

          .sidebar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 20px;
          }

          .sidebar::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
          }

          /* Hover Effects */
          .nav-item:hover .nav-icon {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }

          .nav-item:active {
            transform: scale(0.98);
          }

          /* Animation for active state */
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .nav-item.active {
            animation: slideIn 0.3s ease forwards;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .sidebar {
              width: 240px;
            }
          }

          @media (max-width: 640px) {
            .sidebar {
              width: 100%;
              height: auto;
              padding: 16px;
            }

            .user-profile {
              margin-top: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Service;
