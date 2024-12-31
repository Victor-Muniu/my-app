import React from 'react';
import { X } from 'lucide-react';

const BillDetails = ({ bill, onClose }) => {
  // Ensure bill and its properties exist
  if (!bill) {
    return null; // or return an error message
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div style={styles.receipt}>
          <h2 style={styles.title}>Epashikino Resort & Spa</h2>
          <p style={styles.subtitle}>Receipt</p>
          <div style={styles.billInfo}>
            <p>Bill #{bill._id ? bill._id.slice(-3) : 'N/A'}</p>
            <p>Date: {bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : 'N/A'}</p>
            <p>Time: {bill.createdAt ? new Date(bill.createdAt).toLocaleTimeString() : 'N/A'}</p>
          </div>
          <div style={styles.customerInfo}>
            <p>Table: {bill.table && bill.table.table_number ? bill.table.table_number : 'N/A'}</p>
            <p>Served by: {bill.served_by ? `${bill.served_by.fname} ${bill.served_by.lname}` : 'N/A'}</p>
          </div>
          <table style={styles.itemsTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Item</th>
                <th style={styles.tableHeader}>Qty</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items && bill.items.map((item, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td>{item.menu_item.name || 'N/A'}</td>
                  <td style={styles.centered}>{item.quantity || 0}</td>
                  <td style={styles.centered}>
                    Ksh {item.price ? item.price.toFixed(2) : '0.00'}
                  </td>
                  <td style={styles.centered}>
                    Ksh {item.quantity && item.price ? (item.quantity * item.price).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.totalSection}>
            <p style={styles.totalLabel}>Total:</p>
            <p style={styles.totalAmount}>
              Ksh {bill.total_amount ? bill.total_amount.toFixed(2) : '0.00'}
            </p>
          </div>
          <p style={styles.thankYou}>Thank you for dining with us!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#374151',
  },
  receipt: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: 1.6,
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  billInfo: {
    marginBottom: '16px',
  },
  customerInfo: {
    marginBottom: '16px',
  },
  itemsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '16px',
  },
  tableHeader: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '8px',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  centered: {
    textAlign: 'center',
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  totalLabel: {
    fontSize: '18px',
  },
  totalAmount: {
    fontSize: '18px',
  },
  thankYou: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export default BillDetails;

