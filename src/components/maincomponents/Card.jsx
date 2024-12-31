import React from 'react';
import { X, Play, RotateCcw, Send } from 'lucide-react';

function Card({ kot, staffColor }) {
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
          case 'new':
            return 'bg-green-100 text-green-800';
          case 'completed':
            return 'bg-blue-100 text-blue-800';
          case 'pending':
            return 'bg-red-100 text-red-800';
          case 'in progress':
            return 'bg-yellow-100 text-yellow-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };
    
      const getRandomTime = () => {
        return Math.floor(Math.random() * 20) + 5;
      };
    
  return (
    <div className="kot-card">
      <div className="staff-header" style={{ borderLeftColor: staffColor }}>
        <div className="staff-info">
          <div className="avatar" style={{ backgroundColor: staffColor }}>
            {kot.bill?.served_by.fname[0]}
            {kot.bill?.served_by.lname[0]}
          </div>
          <div className="staff-details">
            <div className="staff-name">
              {kot.bill?.served_by.fname} {kot.bill?.served_by.lname}
            </div>
            <div className="staff-role">{kot.bill?.served_by.emp_no}</div>
          </div>
        </div>
        <div className={`status-badge ${getStatusClass(kot.bill?.status)}`}>
          {kot.bill?.status || 'New'}
        </div>
      </div>

      <div className="kot-details">
        <div className="kot-header">
          <div className="kot-number">KOT #{kot._id.slice(-4)}</div>
          <div className="table-number">Table {kot.bill?.table.table_number}</div>
        </div>

        <div className="items-list">
          {kot.items.map((item) => (
            <div key={item._id} className="item">
              <div className="item-info">
                <span className="quantity">{item.quantity}x</span>
                <span className="name">{item.menu_item?.name}</span>
              </div>
              <div className="prep-time">{getRandomTime()} mins</div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="btn start">
            <Play size={16} />
            Start
          </button>
          <button className="btn reassign">
            <RotateCcw size={16} />
            Reassign
          </button>
          <button className="btn complete">
            <Send size={16} />
            Complete
          </button>
          <button className="btn cancel">
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>

      <style jsx>{`
        .kot-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 16px;
          overflow: hidden;
        }

        .staff-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-left: 4px solid;
          background: #f8fafc;
        }

        .staff-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .staff-details {
          display: flex;
          flex-direction: column;
        }

        .staff-name {
          font-weight: 600;
          font-size: 14px;
        }

        .staff-role {
          font-size: 12px;
          color: #64748b;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .kot-details {
          padding: 16px;
        }

        .kot-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .kot-number {
          font-weight: 600;
        }

        .table-number {
          color: #64748b;
        }

        .items-list {
          margin-bottom: 16px;
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .item-info {
          display: flex;
          gap: 8px;
        }

        .quantity {
          color: #64748b;
        }

        .prep-time {
          color: #64748b;
          font-size: 14px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: background-color 0.2s;
        }

        .start {
          background: #22c55e;
          color: white;
        }

        .reassign {
          background: #f8fafc;
          color: #64748b;
        }

        .complete {
          background: #3b82f6;
          color: white;
        }

        .cancel {
          background: #ef4444;
          color: white;
        }

        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}

export default Card