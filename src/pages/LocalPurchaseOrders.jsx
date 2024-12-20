import React, { useState, useEffect } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import axios from "axios";
import AddLPOForm from "../components/maincomponents/AddLPOForm";
import LPOView from "../components/maincomponents/LPOView";

const LocalPurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/lpo", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const handleAddLPO = async (lpoData) => {
    try {
      const response = await axios.post("http://localhost:3002/lpo", lpoData, {
        withCredentials: true,
      });
      setOrders([...orders, response.data]);
      setIsAddFormVisible(false);
    } catch (error) {
      console.error("Error adding LPO:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLPO, setSelectedLPO] = useState(null);

  const handleViewLPO = (lpo) => {
    setSelectedLPO(lpo);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Local Purchase Orders</h1>
        <button
          className="new-lpo-button"
          onClick={() => setIsAddFormVisible(true)}
        >
          + New LPO
        </button>
      </div>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search LPOs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="actions">
          <button className="control-button">
            <Filter size={16} />
            Filter
          </button>
          <button className="control-button">
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>LPO NUMBER</th>
              <th>SUPPLIER</th>
              <th>PREPARED BY</th>
              <th>TOTAL AMOUNT</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.lpo_number}</td>
                <td>{order.supplier.name}</td>
                <td>
                  <div className="prepared-by">
                    <span>
                      {order.prepared_by.fname} {order.prepared_by.lname}
                    </span>
                  </div>
                </td>
                <td>KSH {order.total_order_price.toFixed(2)}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="icon-button"
                      onClick={() => handleViewLPO(order)}
                    >
                      <Eye size={16} />
                    </button>
                    <button className="icon-button">
                      <Pencil size={16} />
                    </button>
                    <button className="icon-button delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="pagination-info">Showing 1 to 10 of 57 results</span>
        <div className="pagination-controls">
          <button className="pagination-button" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isAddFormVisible && (
        <AddLPOForm
          onClose={() => setIsAddFormVisible(false)}
          onSubmit={handleAddLPO}
        />
      )}

      {selectedLPO && (
        <LPOView lpo={selectedLPO} onClose={() => setSelectedLPO(null)} />
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .new-lpo-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 0.625rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .new-lpo-button:hover {
          background-color: #4338ca;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .search-container {
          flex: 1;
        }

        .search-input {
          width: 100%;
          padding: 0.625rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 1px #4f46e5;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .control-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #374151;
          cursor: pointer;
        }

        .control-button:hover {
          background-color: #f9fafb;
        }

        .table-container {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        th {
          background-color: #f9fafb;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 500;
          color: #6b7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        td {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          color: #111827;
        }

        .prepared-by {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          object-fit: cover;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.approved {
          background-color: #ecfdf5;
          color: #059669;
        }

        .status-badge.pending {
          background-color: #fef3c7;
          color: #d97706;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .icon-button {
          padding: 0.375rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-button:hover {
          background-color: #f3f4f6;
          color: #111827;
        }

        .icon-button.delete:hover {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .pagination-info {
          font-size: 0.875rem;
        }

        .pagination-controls {
          display: flex;
          gap: 0.25rem;
        }

        .pagination-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          background-color: white;
          color: #374151;
          cursor: pointer;
        }

        .pagination-button:hover:not(:disabled) {
          background-color: #f9fafb;
        }

        .pagination-button.active {
          background-color: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }

        .pagination-button:disabled {
          background-color: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          z-index: 1000;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .controls {
            flex-direction: column;
          }

          .table-container {
            overflow-x: auto;
          }

          .pagination {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default LocalPurchaseOrders;
