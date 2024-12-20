import React from 'react';
import Logo from '../../images/Logo.jpg'

const LPOView = ({ lpo, onClose }) => {
  console.log(lpo)

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="lpo-container">
        <div className="lpo-content">
          <div className="header-section">
            <div className="company-info">
              <div className="company-logo">
                <img 
                  src={Logo} 
                  alt="Epashikino Resort & Spa" 
                  style={{ width: '100px', height: 'auto' }}
                />
              </div>
              <div>
                <h2>EPASHIKINO Resort & Spa</h2>
                <p>Nakuru Naivasha HighWay</p>
                <p>Opp. Lake Elementaita</p>
                <p>P.O Box 488-20117</p>
                <p>info@epashikinoresort.com</p>
              </div>
            </div>
            <div className="lpo-header">
              <h1>LOCAL PURCHASE ORDER</h1>
              <div className="lpo-details">
                <div className="detail-row">
                  <span>Date:</span>
                  <span>{new Date(lpo?.date).toLocaleDateString()}</span>
                </div>
                
                <div className="detail-row">
                  <span>LPO Number:</span>
                  <span>{lpo?.lpo_number}</span>
                </div>
                
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="section">
            <h3>SUPPLIER INFORMATION</h3>
            <div className="supplier-info">
              <p className="supplier-name">{lpo?.supplier?.name}</p>
              <p>{lpo?.supplier?.email}</p>
              <p>{lpo?.supplier?.tel_no}</p>
              <p>Tax ID: {lpo?.supplier?.KRA_pin} {lpo?.supplier?.VAT_No}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="section">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item No</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {lpo?.inventory_items?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.inventory.name}</td>
                    <td>{item.quantity}</td>
                    <td>KSH {item.unit_price.toFixed(2)}</td>
                    <td>KSH {(item.total_price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td>Total:</td>
                  <td>KSH {(lpo?.total_order_price).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Terms and Conditions */}
          <div className="section">
            <h3>TERMS & CONDITIONS</h3>
            <ol className="terms-list">
              <li>Payment terms: Net 30 days</li>
              <li>Delivery within 14 days from order confirmation</li>
              <li>All prices are in KSH</li>
            </ol>
          </div>

          <div className="signatures">
            <div className="signature-block">
              <p>Prepared By:</p>
              <div className="signature-line">
                <p className="name">{lpo?.prepared_by?.fname} {lpo?.prepared_by?.lname}</p>
                <p className="title">{lpo?.prepared_by?.role}</p>
                <p className='title'>Sign: _____________</p>
              </div>
            </div>
            <div className="signature-block">
              <p>Approved By:</p>
              <div className="signature-line">
                <p className="name">Name: _______________________</p>
                <p className='title'>Date: ______________</p>
                <p className="title">Sign: _________________</p>
              </div>
            </div>
          </div>

          <div className="footer">
            <p>This LPO is valid for 30 days from the date of issue</p>
            <p className="company-tagline">Epashikino Resort & Spa</p>
          </div>

          <button className="close-button" onClick={onClose}>Close</button>
          <button className="print-button" onClick={handlePrint}>Print</button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem;
          z-index: 1000;
          overflow-y: auto;
        }

        .lpo-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 210mm;
          padding: 2rem;
          margin: auto;
        }

        .lpo-content {
          position: relative;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .company-info {
          display: flex;
          gap: 1rem;
        }

        .company-logo {
          color: #4f46e5;
        }

        .company-info h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #111827;
        }

        .company-info p {
          margin: 0.25rem 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .lpo-header {
          text-align: right;
        }

        .lpo-header h1 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          color: #111827;
        }

        .lpo-details {
          display: grid;
          gap: 0.5rem;
        }

        .detail-row {
          display: grid;
          grid-template-columns: auto auto;
          gap: 1rem;
          justify-content: end;
          font-size: 0.875rem;
        }

        .detail-row span:first-child {
          color: #6b7280;
        }

        .section {
          margin: 2rem 0;
        }

        .section h3 {
          color: #374151;
          font-size: 1rem;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .supplier-info {
          color: #4b5563;
          font-size: 0.875rem;
        }

        .supplier-info p {
          margin: 0.25rem 0;
        }

        .supplier-name {
          font-weight: 600;
          color: #111827;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .items-table th {
          background-color: #f9fafb;
          padding: 0.75rem;
          text-align: left;
          font-weight: 500;
          color: #6b7280;
        }

        .items-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .items-table tfoot td {
          font-weight: 500;
        }

        .terms-list {
          color: #4b5563;
          font-size: 0.875rem;
          padding-left: 1.25rem;
          margin: 0;
        }

        .terms-list li {
          margin: 0.5rem 0;
        }

        .signatures {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin: 2rem 0;
        }

        .signature-block p {
          margin: 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .signature-line {
          margin-top: 2rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 0.5rem;
        }

        .signature-line .name {
          font-weight: 500;
          color: #111827;
        }

        .signature-line .title {
          color: #6b7280;
          font-size: 0.75rem;
        }

        .footer {
          text-align: center;
          margin-top: 2rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .company-tagline {
          color: #4f46e5;
          font-style: italic;
          margin-top: 0.5rem;
        }

        .close-button,
        .print-button {
          position: fixed;
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .close-button {
          top: 1rem;
          right: 1rem;
        }

        .print-button {
          top: 1rem;
          right: 6rem;
        }

        .close-button:hover,
        .print-button:hover {
          background-color: #4338ca;
        }

        @media print {
          .modal-overlay {
            position: relative;
            padding: 0;
            background: none;
          }

          .lpo-container {
            box-shadow: none;
          }

          .close-button,
          .print-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LPOView;

