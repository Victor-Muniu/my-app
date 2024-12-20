import React from 'react'
import { BarChart2, Box, ClipboardList, FileText, Package,  ShoppingCart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Procurement() {
    const navItems = [
        { name: 'Dashboard', icon: <BarChart2 size={18} />, active: true, path: "/dashboard" },
        {name: 'Address Book', icon: <Users size={18}/>,  path: '/supplier_address'},
        { name: 'Suppliers', icon: <Users size={18} />, path:'/creditors' },
        { name: 'Requisitions', icon: <ClipboardList size={18} />, path:'/requisitions' },
        { name: 'LPO', icon: <FileText size={18} />, path: '/lpo' },
        { name: 'Inventory', icon: <Package size={18} />, path: '/inventory' },
        { name: 'Purchase Reports', icon: <ShoppingCart size={18} />, path:'/reports' },
    ]
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path); 
  }
  return (
    <aside className="sidebar">
        <div className="logo">
          <Box size={24} />
          <h1>Procurement</h1>
        </div>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href="#" 
              onClick={() => navigateTo(item.path)}  
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <style jsx>{`
        sidebar {
          width: 240px;
          background-color: white;
          padding: 20px;
          border-right: 1px solid #eaecef;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 24px;
        }

        .logo h1 {
          font-size: 20px;
          font-weight: 600;
          color: #1a1f36;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          color: #4a5568;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background-color: #f7fafc;
        }

        .nav-item.active {
          background-color: #f0f5ff;
          color: #2563eb;
        }
        `}
        </style>
      </aside>
  )
}

export default Procurement