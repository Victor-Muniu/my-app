import React, { useState, useEffect } from "react";
import axios from 'axios';

function Podium() {
  const [salesPerformers, setSalesPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const [restaurantBills, barBills] = await Promise.all([
        axios.get("http://localhost:3002/bills", { withCredentials: true }),
        axios.get("http://localhost:3002/bar-bills", { withCredentials: true })
      ]);

      const allBills = [...restaurantBills.data, ...barBills.data];
      const performersMap = new Map();

      allBills.forEach(bill => {
        const { _id, fname, lname, emp_no } = bill.served_by;
        if (performersMap.has(_id)) {
          performersMap.get(_id).totalSales += bill.total_amount;
        } else {
          performersMap.set(_id, {
            _id,
            name: `${fname} ${lname}`,
            totalSales: bill.total_amount,
            image: `/placeholder.svg?height=60&width=60`
          });
        }
      });

      const sortedPerformers = Array.from(performersMap.values())
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 10);

      setSalesPerformers(sortedPerformers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setError("Failed to fetch sales data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const topPerformers = salesPerformers.slice(0, 3);
  const salesTable = salesPerformers.slice(3);

  const totalSales = salesPerformers.reduce((sum, performer) => sum + performer.totalSales, 0);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Top Sales Performers</h1>
        <div className="filters">
          <div className="date-picker">
            <span className="calendar-icon">📅</span>
            {new Date().toLocaleDateString()}
          </div>
          <select className="period-select">
            <option>This Month</option>
          </select>
          <select className="category-select">
            <option>All Categories</option>
          </select>
        </div>
      </header>

      <div className="podium-container">
        {topPerformers.map((performer, index) => (
          <div
            key={performer._id}
            className={`podium-position position-${index + 1}`}
          >
            <div className="performer-card">
              <img
                src={performer.image}
                alt={performer.name}
                className="performer-avatar"
              />
              <h3>{performer.name}</h3>
              <div className="amount">${performer.totalSales.toLocaleString()}</div>
              <div className="rank">
                {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sales-table">
        <div className="table-header">
          <div className="rank-col">RANK</div>
          <div className="staff-col">STAFF</div>
          <div className="amount-col">SALES AMOUNT</div>
          <div className="percentage-col">% OF TOTAL</div>
        </div>
        {salesTable.map((performer, index) => (
          <div key={performer._id} className="table-row">
            <div className="rank-col">{index + 4}</div>
            <div className="staff-col">
              <img src={performer.image} alt={performer.name} className="staff-avatar" />
              <span>{performer.name}</span>
            </div>
            <div className="amount-col">${performer.totalSales.toLocaleString()}</div>
            <div className="percentage-col">
              {((performer.totalSales / totalSales) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      <section className="performance-section">
        <h2>Performance Comparison</h2>
        <div className="chart-placeholder">
          Chart placeholder: Line graph showing sales trends over time
        </div>
      </section>

      <section className="insights-section">
        <h2>Insights</h2>
        <div className="insights-grid">
          <div className="insight-card top-seller">
            <h3>Top Seller of the Month</h3>
            <p>{topPerformers[0]?.name} - ${topPerformers[0]?.totalSales.toLocaleString()} in sales</p>
          </div>
          <div className="insight-card most-improved">
            <h3>Most Improved</h3>
            <p>Data not available</p>
          </div>
        </div>
      </section>
      <footer className="dashboard-footer">
        © {new Date().getFullYear()} Sales Performance Dashboard. All rights reserved.
      </footer>
      <style jsx>{`
        .dashboard {
          padding: 24px;
          background-color: #f8fafc;
          min-height: 100vh;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .filters {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .date-picker {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          color: #64748b;
        }

        .period-select,
        .category-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          font-size: 14px;
          color: #64748b;
          cursor: pointer;
        }

        .podium-container {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 48px;
          padding: 24px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .podium-position {
          flex: 1;
          max-width: 280px;
          transition: transform 0.2s ease;
        }

        .podium-position:hover {
          transform: translateY(-4px);
        }

        .position-1 {
          order: 2;
          margin-bottom: 40px;
        }

        .position-2 {
          order: 1;
          margin-bottom: 20px;
        }

        .position-3 {
          order: 3;
          margin-bottom: 0;
        }

        .performer-card {
          background: #f1f5f9;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
        }

        .position-1 .performer-card {
          background: #fef9c3;
        }

        .performer-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-bottom: 12px;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .performer-card h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #1e293b;
        }

        .amount {
          font-size: 24px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .rank {
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
        }

        .position-1 .rank {
          color: #854d0e;
        }

        .sales-table {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .table-header {
          display: grid;
          grid-template-columns: 80px 2fr 1fr 1fr 80px;
          padding: 12px 16px;
          background: #f8fafc;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }

        .table-row {
          display: grid;
          grid-template-columns: 80px 2fr 1fr 1fr 80px;
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          align-items: center;
        }

        .staff-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .staff-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .trend-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 14px;
        }

        .trend-indicator.up {
          background: #dcfce7;
          color: #22c55e;
        }

        .performance-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .performance-section h2 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 24px 0;
        }

        .chart-placeholder {
          height: 300px;
          background: #f8fafc;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-size: 14px;
        }

        .insights-section h2 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 24px 0;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .insight-card {
          padding: 24px;
          border-radius: 12px;
        }

        .insight-card h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .insight-card p {
          margin: 0;
          font-size: 14px;
        }

        .top-seller {
          background: #eff6ff;
          color: #1e40af;
        }

        .most-improved {
          background: #dcfce7;
          color: #166534;
        }

        .dashboard-footer {
          text-align: center;
          padding: 24px 0;
          color: #64748b;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .podium-container {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .podium-position {
            order: unset !important;
            margin-bottom: 0 !important;
            width: 100%;
          }

          .table-header,
          .table-row {
            grid-template-columns: 60px 1fr 100px;
          }

          .percentage-col,
          .trend-col {
            display: none;
          }

          .insights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Podium;
