import React,{useState}from 'react';
import { Eye, Check, Bell } from 'lucide-react';
import BillDetails from './BillDetails';
const BillCard = ({ bill, canMarkPaid, onMarkPaid, onView, onRemind }) => {
    const [showDetails, setShowDetails] = useState(false);
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partially_paid':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bill-card" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.billId}>#{bill._id.slice(-3)}</div>
        <div
          style={{ ...styles.statusBadge, ...styles[getStatusClass(bill.status)] }}
        >
          {bill.status.replace('_', ' ')}
        </div>
      </div>

      <div style={styles.info}>
        <div style={styles.tableInfo}>
          <div style={styles.tableNumber}>Table {bill.table.table_number}</div>
          <div style={styles.customerName}>Served By: {bill.served_by.fname} {bill.served_by.lname}</div>
        </div>
        <div style={styles.orderDetails}>
          <div style={styles.orderTime}>
            Order Time: {new Date(bill.createdAt).toLocaleTimeString()}
          </div>
          <div style={styles.amount}>Ksh {bill.total_amount.toFixed(2)}</div>
        </div>
      </div>

      <div style={styles.actions}>
      <button style={{ ...styles.actionBtn, ...styles.view }} onClick={() => setShowDetails(true)}>
          <Eye size={16} /> View
        </button>
        {canMarkPaid && (
          <button
            style={{ ...styles.actionBtn, ...styles.markPaid }}
            onClick={() => onMarkPaid(bill._id)}
          >
            <Check size={16} /> Mark Paid
          </button>
        )}
        <button
          style={{ ...styles.actionBtn, ...styles.remind }}
          onClick={() => onRemind(bill._id)}
        >
          <Bell size={16} /> Remind
        </button>
      </div>
      {showDetails && (
        <BillDetails bill={bill} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  billId: {
    fontWeight: 600,
    color: '#374151',
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  info: {
    marginBottom: '16px',
  },
  tableInfo: {
    marginBottom: '8px',
  },
  tableNumber: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#111827',
  },
  customerName: {
    color: '#6b7280',
    fontSize: '14px',
  },
  orderDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTime: {
    color: '#6b7280',
    fontSize: '14px',
  },
  amount: {
    fontWeight: 600,
    color: '#111827',
    fontSize: '16px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
  },
  view: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
  },
  markPaid: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  remind: {
    backgroundColor: '#6366f1',
    color: 'white',
  },
};

export default BillCard;
