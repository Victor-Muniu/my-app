import React, { useRef } from "react";
import Logo from "../../images/Logo.jpg";
const BillModal = ({ billDetails, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current;
    const winPrint = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );

    winPrint.document.write(`
          <html>
            <head>
              <title>Print Bill</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                .bill-content {
                  width: 80mm;
                  margin: 0 auto;
                  padding: 10mm;
                }
                .logo { text-align: center; margin-bottom: 10mm; }
                .logo img { width: 60mm; height: auto; }
                .restaurant-info { text-align: center; margin-bottom: 5mm; }
                .restaurant-info h1 { font-size: 18pt; margin: 0; }
                .tagline, .address, .contact { font-size: 8pt; margin: 2mm 0; }
                .receipt-header { margin-bottom: 5mm; border-bottom: 1px dashed #000; }
                .receipt-row { display: flex; justify-content: space-between; font-size: 9pt; }
                .items-header, .item-row {
                  display: grid;
                  grid-template-columns: 2fr 0.5fr 1fr 1fr;
                  font-size: 9pt;
                  padding: 1mm 0;
                }
                .items-header { font-weight: bold; border-bottom: 1px solid #000; }
                .col-qty, .col-price, .col-total { text-align: right; }
                .totals-section { border-top: 1px solid #000; padding-top: 2mm; margin-top: 2mm; }
                .subtotal-row, .vat-row, .service-row, .grand-total-row {
                  display: flex;
                  justify-content: space-between;
                  font-size: 9pt;
                  margin: 1mm 0;
                }
                .grand-total-row { font-weight: bold; border-top: 1px solid #000; padding-top: 1mm; }
                .footer { text-align: center; margin-top: 5mm; font-size: 8pt; }
                .thank-you { font-weight: bold; }
                .social-links, .signature-line { margin-top: 3mm; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);

    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close();
  };
  return (
    <div className="bill-overlay">
      <div className="bill-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <button className="print-button" onClick={handlePrint}>
          🖨️ Print Receipt
        </button>

        <div className="bill-content" ref={printRef}>
          <div className="logo">
            <img src={Logo} width="130px" height="auto" />
          </div>
          <div className="restaurant-info">
            <h1>Epashikino Resort & Spa LTD</h1>
            <p className="tagline">Your Ultimate Joyous Experience</p>
            <p className="address">P.O Box 12328-20100, NAKURU</p>
            <p className="contact">
              Tel: (+254) 705 455 001 / (+254) 788 455 001
              <br />
              info@epashikinoresort.com
              <br />
              www.epashikinoresort.com
            </p>
          </div>
          <div className="receipt-details">
            <div className="receipt-header">
              <div className="receipt-row">
                <span>
                  Receipt #: INV{new Date().getFullYear()}-
                  {String(billDetails?.table?.table_number || "000").padStart(
                    3,
                    "0"
                  )}
                </span>
                <span>
                  Table: {billDetails?.table?.table_number || "Unknown"}
                </span>
              </div>
              <div className="receipt-row">
                <span>
                  Date: {new Date(billDetails.createdAt).toDateString()}
                </span>
                <span>
                  Served by: {billDetails?.served_by?.fname || "Unknown"}{" "}
                  {billDetails?.served_by?.lname || ""}
                </span>
              </div>
              <div className="items-section">
                <div className="items-header">
                  <span className="col-item">Item</span>
                  <span className="col-qty">Qty</span>
                  <span className="col-price">Price</span>
                  <span className="col-total">Total</span>
                </div>

                {billDetails.items.map((item) => (
                  <div key={item._id} className="item-row">
                    <span className="col-item">{item.menu_item.name}</span>
                    <span className="col-qty">{item.quantity}</span>
                    <span className="col-price">
                      {" "}
                      {item.menu_item.price.toFixed(2)}
                    </span>
                    <span className="col-total">
                      {" "}
                      {item.total_price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="totals-section">
                <div className="subtotal-row">
                  <span>Total</span>
                  <span>{billDetails.total_amount.toFixed(2)}</span>
                </div>
              </div>
              <div className="footer">
                <p className="thank-you">Thank you for dining with us!</p>
                <p className="come-again">We hope to see you again soon</p>
                <div className="social-links">
                  <span>📘</span>
                  <span>📸</span>
                  <span>🐦</span>
                </div>
                <div className="signature-line">
                  <p>Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .bill-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .bill-modal {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          color: #64748b;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }

        .bill-content {
          padding: 32px;
        }

        .logo {
          text-align: center;
          margin-bottom: 16px;
        }

        .restaurant-info {
          text-align: center;
          margin-bottom: 24px;
        }

        .restaurant-info h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1e293b;
        }

        .tagline {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 12px 0;
          font-style: italic;
        }

        .address,
        .contact {
          font-size: 12px;
          color: #64748b;
          margin: 4px 0;
        }

        .receipt-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px dashed #e2e8f0;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .items-section {
          margin-bottom: 24px;
        }

        .items-header {
          display: grid;
          grid-template-columns: 2fr 0.5fr 1fr 1fr;
          padding: 8px 0;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }

        .item-row {
          display: grid;
          grid-template-columns: 2fr 0.5fr 1fr 1fr;
          padding: 8px 0;
          font-size: 14px;
          color: #1e293b;
        }

        .col-qty,
        .col-price,
        .col-total {
          text-align: right;
        }

        .totals-section {
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
          margin-bottom: 24px;
        }

        .subtotal-row,
        .vat-row,
        .service-row,
        .grand-total-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 14px;
        }

        .subtotal-row,
        .vat-row,
        .service-row {
          color: #64748b;
        }

        .grand-total-row {
          border-top: 1px solid #e2e8f0;
          margin-top: 8px;
          padding-top: 8px;
          font-weight: 600;
          color: #1e293b;
        }

        .footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px dashed #e2e8f0;
        }

        .thank-you {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .come-again {
          font-size: 12px;
          color: #64748b;
          margin: 0 0 16px 0;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
          font-size: 20px;
        }

        .signature-line {
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
          font-size: 12px;
          color: #64748b;
        }

        .print-button {
          position: absolute;
          top: 16px;
          right: 60px;
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

        @media print {
          .bill-overlay {
            position: static;
            background: none;
          }

          .bill-modal {
            box-shadow: none;
            max-height: none;
          }

          .close-button {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .bill-modal {
            width: 100%;
            height: 100%;
            max-height: none;
            border-radius: 0;
          }

          .bill-content {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default BillModal;
