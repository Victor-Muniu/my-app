import React, { useRef, useEffect } from "react";
import Logo from "../../images/Logo.jpg";

function KOTModal({ kotDetails, onClose }) {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handlePrint = (kotContent) => {
    const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
    winPrint.document.write(`
      <html>
        <head>
          <title>Print KOT</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .kot-container {
              width: 80mm;
              margin: 0 auto;
              padding: 10mm;
            }
            .logo { text-align: center; margin-bottom: 10mm; }
            .logo img { width: 60mm; height: auto; }
            .restaurant-name { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 5mm; }
            .kot-info { margin-bottom: 5mm; }
            .kot-info span { display: block; font-size: 9pt; }
            .table-info { margin-bottom: 5mm; font-size: 9pt; }
            .rush-order {
              background: #ef4444;
              color: white;
              padding: 2mm;
              text-align: center;
              margin-bottom: 5mm;
              font-size: 9pt;
            }
            .order-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 5mm;
              font-size: 9pt;
            }
            .order-table th, .order-table td {
              border: 1px solid #ddd;
              padding: 2mm;
              text-align: left;
            }
            .server-info, .footer {
              font-size: 8pt;
              text-align: center;
              margin-top: 5mm;
            }
          </style>
        </head>
        <body>
          ${kotContent.innerHTML}
        </body>
      </html>
    `);
    
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close();
  };

  return (
    <div className="kot-overlay">
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      <div className="kot-content">
        {kotDetails.map((order, idx) => {
          const { bill, created_at, items, _id } = order;
          const tableNumber = bill?.table?.table_number;
          const orderItems = items.map(item => ({
            qty: `${item.quantity}x`,
            item: item.menu_item.name,
            notes: item.menu_item.price ? `Ksh ${item.menu_item.price}` : '-',
          }));

          return (
            <div key={idx} className="kot-container">
              <div className="kot-header">
                <h2>KOT #{idx + 1}</h2>
                <button className="print-button" onClick={() => handlePrint(document.getElementById(`kot-${idx}`))}>
                  🖨️ Print KOT
                </button>
              </div>
              <div id={`kot-${idx}`} className="kot-printable">
                <div className="restaurant-header">
                  <div className="restaurant-icon">
                    <img src={Logo} width="130px" height="auto" alt="Restaurant Logo" />
                  </div>
                  <div className="restaurant-name">Epashikino Resort & Spa</div>
                </div>

                <div className="kot-details">
                  <div className="kot-info">
                    <span>KOT #: {order._id}</span>
                    <span>Date: {new Date(created_at).toLocaleDateString()}</span>
                    <span>Time: {new Date(created_at).toLocaleTimeString()}</span>
                  </div>

                  <div className="table-info">
                    Table: <span className="table-number">{tableNumber}</span>
                    <span className="dine-in">DINE-IN</span>
                  </div>
                </div>

                {bill.status === 'not cleared' && <div className="rush-order">RUSH ORDER</div>}

                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Qty</th>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.qty}</td>
                        <td>{item.item}</td>
                        <td>{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="server-info">
                  Served by: 
                </div>

                <div className="footer">
                  Prepared with care by Epashikino Resort & Spa
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .kot-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .close-button {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background-color: #f1f5f9;
          color: #64748b;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 1000;
        }

        .close-button:hover {
          background-color: #e2e8f0;
          color: #1e293b;
        }

        .kot-content {
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .kot-container {
          background: white;
          width: 100%;
          max-width: 400px;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .kot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .kot-header h2 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .print-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .print-button:hover {
          background-color: #2563eb;
        }

        .restaurant-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .restaurant-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .restaurant-name {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }

        .kot-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .kot-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: #444;
        }

        .table-info {
          text-align: right;
          color: #444;
        }

        .table-number {
          color: #000;
          font-weight: bold;
          margin-left: 4px;
        }

        .dine-in {
          display: block;
          color: #2563eb;
          font-size: 12px;
          margin-top: 4px;
        }

        .rush-order {
          background-color: #ef4444;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .order-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .order-table th {
          text-align: left;
          padding: 8px;
          border-bottom: 2px solid #e5e7eb;
          color: #666;
          font-weight: 500;
        }

        .order-table td {
          padding: 8px;
          border-bottom: 1px solid #e5e7eb;
        }

        .order-table tr:last-child td {
          border-bottom: none;
        }

        .server-info {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #666;
        }

        .footer {
          margin-top: 12px;
          text-align: center;
          font-size: 12px;
          color: #666;
          font-style: italic;
        }

        @media print {
          .kot-header, .close-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default KOTModal;

