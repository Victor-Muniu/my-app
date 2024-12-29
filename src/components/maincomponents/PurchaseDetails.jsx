import React, { useEffect } from "react";

const PurchaseDetails = ({ purchase, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Purchase Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Purchase Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Purchase ID</label>
                <span>{purchase.purchase_number}</span>
              </div>
              <div className="detail-item">
                <label>Date</label>
                <span>
                  {new Date(purchase.date_of_purchase).toLocaleDateString()}
                </span>
              </div>

              <div className="detail-item">
                <label>Payment Status</label>
                <span className={`status ${purchase.status.toLowerCase()}`}>
                  {purchase.status}
                </span>
              </div>
            </div>
          </div>
          <div className="detail-section">
            <h3>Supplier Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Supplier Name</label>
                <span>{purchase.supplier.name}</span>
                <span>{purchase.supplier.email}</span>
              </div>
            </div>
          </div>
          <div className="detail-section">
            <h3>Item Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Name</label>

                {purchase.items.map((item, index) => (
                  <div key={index}>
                    <span>{item.inventory.name}</span>
                  </div>
                ))}
              </div>
              <div className="detail-item">
                <label>Unit Price</label>
                {purchase.items.map((item, index)=>(
                    <div key={index}>
                        <span>KSH {item.inventory.unit_price}</span>
                    </div>
                ))}
              </div>
              <div className="detail-item">
                <label>Quantity</label>
                {purchase.items.map((item, index)=>(
                    <div key={index}>
                        <span> {item.quantity}</span>
                    </div>
                ))}
              </div>
              <div className="detail-item">
                <label>Price</label>
                {purchase.items.map((item, index)=>(
                    <div key={index}>
                        <span> {item.total_price}</span>
                    </div>
                ))}
              </div>
              <div className="detail-item">
                <label>Total Cost</label>
                <span>KSH {purchase.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
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
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 8px;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 20px;
          color: #1a1a1a;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }

        .close-button:hover {
          color: #1a1a1a;
        }

        .modal-body {
          padding: 20px;
        }

        .detail-section {
          margin-bottom: 24px;
        }

        .detail-section h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          color: #1a1a1a;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
        }

        .detail-item span {
          font-size: 14px;
          color: #1a1a1a;
        }

        .status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          width: fit-content;
        }

        .status.completed {
          background-color: #e6f4ea;
          color: #1e7e34;
        }

        .status.pending {
          background-color: #fff3e0;
          color: #e65100;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .primary-button,
        .secondary-button {
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .primary-button {
          background-color: #0066ff;
          color: white;
          border: none;
        }

        .primary-button:hover {
          background-color: #0052cc;
        }

        .secondary-button {
          background-color: white;
          color: #666;
          border: 1px solid #ddd;
        }

        .secondary-button:hover {
          background-color: #f8f9fa;
        }

        @media (max-width: 480px) {
          .modal-content {
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseDetails;
