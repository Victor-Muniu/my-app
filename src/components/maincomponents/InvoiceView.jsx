import React, { useState, useEffect } from "react";
import axios from "axios";

const InvoiceView = ({ onClose, invoice }) => {
  const [invoiceData, setInvoiceData] = useState({
    invoice_number: "",
    supplier: { name: "", email: "" },
    items_received: [],
    total_amount: 0,
    date_received: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/invoices/number/${invoice.invoice.invoice_number}`,
        { withCredentials: true }
      );
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  return (
    <div className="invoice-overlay">
      <div className="invoice-container">
        <div className="invoice-content">
          <div className="invoice-header">
            <div>
              <h1>
                Invoice{" "}
                <span className="invoice-number">
                  {invoiceData.invoice_number}
                </span>
              </h1>
              <p className="subtitle">{invoiceData.supplier.name}</p>
            </div>
          </div>

          <div className="invoice-dates">
            <div className="date-group">
              <label>Issued On:</label>
              <div>{new Date(invoiceData.date_received).toLocaleString()}</div>
            </div>
            <div className="date-group">
              <label>Due On:</label>
              <div></div>
            </div>
          </div>

          <div className="invoice-parties">
            <div className="bill-group">
              <h3>Bill From</h3>
              <div className="party-details">
                <h4>{invoiceData.supplier.name}</h4>
                <p>{invoiceData.supplier.email}</p>
              </div>
            </div>
            <div className="bill-group">
              <h3>Bill To</h3>
              <div className="party-details">
                <h4>Epashikino Resort & Spa</h4>
                <p>Nakuru Naivasha Highway opposite L. Elementaita</p>
                <p>P.O Box 12328-20100</p>
              </div>
            </div>
          </div>

          <div className="invoice-items">
            <h3>Invoice Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items_received.map((item, index) => (
                  <tr key={index}>
                    <td>{item.inventory.name}</td>
                    <td>{item.unit_price}</td>
                    <td>{item.quantity_received}</td>
                    <td>{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-summary">
            <div className="notes">
              <h3></h3>
              <p>
                
              </p>
            </div>
            <div className="total">
              <div className="total-row">
                <span>Total Amount</span>
                <span className="total-amount">
                  Ksh {invoiceData.total_amount}
                </span>
              </div>
            </div>
          </div>

          <div className="invoice-actions">
            <button className="secondary-button" onClick={() => {}}>
              Save as Draft
            </button>
            <div className="right-actions">
              <button className="secondary-button" onClick={onClose}>
                Close
              </button>
              <button className="primary-button">Send</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .invoice-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-y: auto;
          padding: 2rem;
          z-index: 1000;
        }

        .invoice-container {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 800px;
          margin: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .invoice-content {
          padding: 2rem;
        }

        .invoice-header {
          margin-bottom: 2rem;
        }

        .invoice-header h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .invoice-number {
          color: #4f46e5;
        }

        .subtitle {
          color: #6b7280;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }

        .invoice-dates {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .date-group label {
          display: block;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .date-group div {
          font-weight: 500;
          color: #111827;
        }

        .invoice-parties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .bill-group h3 {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .party-details h4 {
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .party-details p {
          margin: 0;
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .invoice-items {
          margin-bottom: 2rem;
        }

        .invoice-items h3 {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background-color: #f9fafb;
          padding: 0.75rem;
          text-align: left;
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
        }

        td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          color: #111827;
        }

        .invoice-summary {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .notes h3 {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .notes p {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background-color: #f9fafb;
          border-radius: 0.375rem;
        }

        .total-amount {
          font-weight: 600;
          color: #111827;
        }

        .payment-notice {
          background-color: #fef3c7;
          border-radius: 0.375rem;
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .notice-content {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .notice-icon {
          color: #d97706;
          font-size: 1.25rem;
        }

        .notice-content p {
          margin: 0;
          color: #92400e;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .invoice-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .right-actions {
          display: flex;
          gap: 0.75rem;
        }

        .secondary-button {
          padding: 0.5rem 1rem;
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          color: #374151;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }

        .secondary-button:hover {
          background-color: #f9fafb;
        }

        .primary-button {
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          border: none;
          border-radius: 0.375rem;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }

        .primary-button:hover {
          background-color: #4338ca;
        }

        @media (max-width: 640px) {
          .invoice-overlay {
            padding: 1rem;
          }

          .invoice-content {
            padding: 1rem;
          }

          .invoice-parties {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .invoice-summary {
            grid-template-columns: 1fr;
          }

          .invoice-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .right-actions {
            width: 100%;
          }

          .secondary-button,
          .primary-button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceView;
