import React from "react";
import {
  Home,
  Store,
  Building2,
  CalendarDays,
  Dumbbell,
  CreditCard,
  Users,
  BarChart3,
  UserCog,
  Settings,
} from "lucide-react";
const menuItems = [
  {
    icon: <Home className="menu-icon" />,
    label: "Curio Resort",
    href: "/",
  },
  {
    icon: <Store className="menu-icon" />,
    label: "Curio POS",
    href: "/pos",
  },
  {
    icon: <Building2 className="menu-icon" />,
    label: "Curio Management",
    href: "/management",
  },
  {
    icon: <CalendarDays className="menu-icon" />,
    label: "Reservations",
    notifications: 2,
    href: "/reservations",
  },
  {
    icon: <Dumbbell className="menu-icon" />,
    label: "Health Club",
    href: "/health-club",
  },
  {
    icon: <CreditCard className="menu-icon" />,
    label: "Billing & Payments",
    href: "/billing",
  },
  {
    icon: <Users className="menu-icon" />,
    label: "Guest Services",
    notifications: 3,
    href: "/guest-services",
  },
  {
    icon: <BarChart3 className="menu-icon" />,
    label: "Reports & Analytics",
    href: "/reports",
  },
  {
    icon: <Building2 className="menu-icon" />,
    label: "Rooms",
    href: "/management",
  },
  {
    icon: <UserCog className="menu-icon" />,
    label: "Staff Management",
    href: "/staff",
  },
  {
    icon: <Settings className="menu-icon" />,
    label: "Settings",
    href: "/settings",
  },
];
function FrontOffice() {
  return (
    <nav className="sidebar">
      {menuItems.map((item, index) => (
        <a key={index} href={item.href} className="menu-item">
          {item.icon}
          <span className="menu-label">{item.label}</span>
          {item.notifications && (
            <span className="notification-badge">{item.notifications}</span>
          )}
        </a>
      ))}

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          text-decoration: none;
          color: #ffffff;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .menu-item .menu-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          color: #ffffff;
        }

        .menu-label {
          font-size: 14px;
          font-weight: 500;
        }

        .notification-badge {
          position: absolute;
          right: 16px;
          background-color: #fbbf24;
          color: #1f2937;
          font-size: 12px;
          font-weight: 600;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
          }

          .menu-item {
            padding: 10px 12px;
          }

          .menu-item:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </nav>
  );
}

export default FrontOffice;
