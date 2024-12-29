import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseDetails from "../components/maincomponents/PurchaseDetails";
const Purchases = () => {
  const [dateRange, setDateRange] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);
  const fetchPurchases = async () => {
    try {
      const response = await axios.get("http://localhost:3002/purchases", {
        withCredentials: true,
      });
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const topSuppliers = [
    { name: "Acme Supplies", amount: 5000 },
    { name: "Clean Co.", amount: 3500 },
    { name: "Food Distributors Inc.", amount: 2750 },
  ];

  const handleViewPurchase = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const purchaseQuantity = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthPurchases = purchases.filter((item) => {
      const purchaseDate = new Date(item.date_of_purchase);
      const purchaseMonth = purchaseDate.getMonth();
      const purchaseYear = purchaseDate.getFullYear();

      return purchaseMonth === currentMonth && purchaseYear === currentYear;
    });

    return currentMonthPurchases.reduce((total, item) => {
      return currentMonthPurchases.reduce((total, item) => {
        return total + item.total_amount;
      }, 0);
    }, 0);
  };

  const totalStockQuantity = purchaseQuantity();

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Purchases</h1>
        <div className="filters">
          <div className="filter-group">
            <label>Date Range</label>
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="date-input"
            />
          </div>

          <div className="filter-group">
            <label>Supplier</label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="select-input"
            >
              <option>All Suppliers</option>
              <option>Acme Supplies</option>
              <option>Clean Co.</option>
              <option>Food Distributors Inc.</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-input"
            >
              <option>All Categories</option>
              <option>Food & Beverages</option>
              <option>Housekeeping Supplies</option>
            </select>
          </div>

          <div className="filter-group search">
            <input
              type="text"
              placeholder="Search purchases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="add-button">+ Add New Purchase</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>PURCHASE ID</th>
              <th>SUPPLIER NAME</th>
              <th>TOTAL COST</th>
              <th>PAYMENT STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>
                  {new Date(purchase.date_of_purchase).toLocaleDateString()}
                </td>
                <td>{purchase.purchase_number}</td>
                <td>{purchase.supplier.name}</td>
                <td>KSH {purchase.total_amount}</td>

                <td>
                  <span className={`status ${purchase.status.toLowerCase()}`}>
                    {purchase.status}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="action-btn view"
                    onClick={() => handleViewPurchase(purchase)}
                  >
                    👁️
                  </button>
                  <button className="action-btn edit">✏️</button>
                  <button className="action-btn delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Monthly Purchases</h3>
          <p className="amount">KSH {totalStockQuantity}</p>
        </div>

        <div className="summary-card">
          <h3>Outstanding Payables</h3>
          <p className="amount red">$3,250.00</p>
        </div>

        <div className="summary-card">
          <h3>Category Breakdown</h3>
          <div className="chart-placeholder">Chart Placeholder</div>
        </div>

        <div className="summary-card">
          <h3>Top Suppliers</h3>
          <ul className="top-suppliers">
            {topSuppliers.map((supplier, index) => (
              <li key={index}>
                <span>{supplier.name}</span>
                <span>${supplier.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer">
        <div className="export-controls">
          <button className="export-btn">📤 Export</button>
          <button className="print-btn">🖨️ Print</button>
        </div>
        <div className="pagination">
          Showing 1-10 of 50 entries
          <button className="page-btn">←</button>
          <button className="page-btn">→</button>
        </div>
      </div>

      {selectedPurchase && (
        <PurchaseDetails
          purchase={selectedPurchase}
          onClose={() => setSelectedPurchase(null)}
        />
      )}
      <style jsx>{`
        .dashboard {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .header {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .header h1 {
          margin: 0 0 20px 0;
          color: #1a1a1a;
          font-size: 24px;
        }

        .filters {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-group label {
          font-size: 14px;
          color: #666;
        }

        .date-input,
        .select-input,
        .search-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          min-width: 200px;
        }

        .search {
          flex-grow: 1;
        }

        .search-input {
          width: 90%;
        }

        .add-button {
          background-color: #0066ff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          height: 38px;
          white-space: nowrap;
        }

        .add-button:hover {
          background-color: #0052cc;
        }

        .table-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        th {
          background-color: #f8f9fa;
          padding: 12px 16px;
          text-align: left;
          color: #666;
          font-weight: 500;
          white-space: nowrap;
        }

        td {
          padding: 12px 16px;
          border-top: 1px solid #eee;
          color: #333;
        }

        .status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status.completed {
          background-color: #e6f4ea;
          color: #1e7e34;
        }

        .status.pending {
          background-color: #fff3e0;
          color: #e65100;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          font-size: 16px;
        }

        .action-btn:hover {
          opacity: 0.7;
        }

        .summary-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .summary-card {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .summary-card h3 {
          margin: 0 0 16px 0;
          color: #666;
          font-size: 16px;
          font-weight: 500;
        }

        .amount {
          font-size: 24px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .amount.red {
          color: #dc3545;
        }

        .chart-placeholder {
          background-color: #f8f9fa;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          border-radius: 4px;
        }

        .top-suppliers {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .top-suppliers li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .top-suppliers li:last-child {
          border-bottom: none;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .export-controls {
          display: flex;
          gap: 12px;
        }

        .export-btn,
        .print-btn,
        .page-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
          color: #666;
          cursor: pointer;
          font-size: 14px;
        }

        .export-btn:hover,
        .print-btn:hover,
        .page-btn:hover {
          background-color: #f8f9fa;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #666;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            width: 100%;
          }

          .date-input,
          .select-input,
          .search-input {
            min-width: 0;
          }

          .summary-section {
            grid-template-columns: 1fr;
          }

          .footer {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Purchases;
