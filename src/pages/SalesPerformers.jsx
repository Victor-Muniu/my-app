import React, { useState } from 'react'

export default function SalesPerformers() {
  const [filters, setFilters] = useState({
    date: 'July 15, 2025',
    period: 'This Month',
    category: 'All Categories'
  })

  const topPerformers = [
    {
      rank: 1,
      name: 'John Doe',
      amount: 100000,
      avatar: '/placeholder.svg?height=48&width=48'
    },
    {
      rank: 2,
      name: 'Jane Smith',
      amount: 85000,
      avatar: '/placeholder.svg?height=48&width=48'
    },
    {
      rank: 3,
      name: 'Alice Johnson',
      amount: 70000,
      avatar: '/placeholder.svg?height=48&width=48'
    }
  ]

  const additionalPerformers = [
    {
      rank: 4,
      name: 'Bob Wilson',
      amount: 65000,
      percentageOfTotal: 18,
      trend: 'up',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  ]

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="sales-performers">
      <div className="header">
        <h1>Top Sales Performers</h1>
        <div className="filters">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="period"
            value={filters.period}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option>All Categories</option>
            <option>Room Sales</option>
            <option>F&B</option>
            <option>Events</option>
          </select>
        </div>
      </div>

      <div className="podium">
        {topPerformers.map((performer) => (
          <div
            key={performer.rank}
            className={`podium-position rank-${performer.rank}`}
          >
            <img src={performer.avatar} alt="" className="performer-avatar" />
            <div className="performer-name">{performer.name}</div>
            <div className="performer-amount">
              ${performer.amount.toLocaleString()}
            </div>
            <div className="rank-label">{
              performer.rank === 1 ? '1st' :
              performer.rank === 2 ? '2nd' : '3rd'
            }</div>
          </div>
        ))}
      </div>

      <table className="performers-table">
        <thead>
          <tr>
            <th>RANK</th>
            <th>STAFF</th>
            <th>SALES AMOUNT</th>
            <th>% OF TOTAL</th>
            <th>TREND</th>
          </tr>
        </thead>
        <tbody>
          {additionalPerformers.map((performer) => (
            <tr key={performer.rank}>
              <td>{performer.rank}</td>
              <td>
                <div className="staff-info">
                  <img src={performer.avatar} alt="" className="staff-avatar" />
                  <span>{performer.name}</span>
                </div>
              </td>
              <td>${performer.amount.toLocaleString()}</td>
              <td>{performer.percentageOfTotal}%</td>
              <td>
                <span className={`trend-indicator ${performer.trend}`}>
                  {performer.trend === 'up' ? '↑' : '↓'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="performance-comparison">
        <h2>Performance Comparison</h2>
        <div className="chart-placeholder">
          Line graph showing sales trends over time
        </div>
      </section>

      <section className="insights">
        <h2>Insights</h2>
        <div className="insights-grid">
          <div className="insight-card top-seller">
            <h3>Top Seller of the Month</h3>
            <p>John Doe - $100,000 in sales</p>
          </div>
          <div className="insight-card most-improved">
            <h3>Most Improved</h3>
            <p>Alice Johnson - 25% increase</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Sales Performance Dashboard. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .sales-performers {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .filters {
          display: flex;
          gap: 10px;
        }

        .filter-input,
        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 40px;
          padding: 20px;
          background: white;
          border-radius: 8px;
        }

        .podium-position {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        .rank-1 {
          background: #fff9c4;
          order: 2;
          padding-bottom: 40px;
        }

        .rank-2 {
          background: #f5f5f5;
          order: 1;
          padding-bottom: 30px;
        }

        .rank-3 {
          background: #ffe0b2;
          order: 3;
          padding-bottom: 20px;
        }

        .performer-avatar {
          width: 48px;
          height: 48px;
          border-radius: 24px;
          margin-bottom: 8px;
        }

        .performer-name {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .performer-amount {
          font-size: 20px;
          font-weight: bold;
          color: #1a73e8;
          margin-bottom: 8px;
        }

        .rank-label {
          font-weight: 500;
          color: #666;
        }

        .performers-table {
          width: 100%;
          background: white;
          border-radius: 8px;
          margin-bottom: 30px;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          color: #666;
          font-weight: 500;
        }

        .staff-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .staff-avatar {
          width: 32px;
          height: 32px;
          border-radius: 16px;
        }

        .trend-indicator {
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: bold;
        }

        .trend-indicator.up {
          background: #e6f4ea;
          color: #1e8e3e;
        }

        .trend-indicator.down {
          background: #fde7e7;
          color: #d32f2f;
        }

        .performance-comparison,
        .insights {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .chart-placeholder {
          height: 300px;
          background: #f5f5f5;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          margin-top: 20px;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .insight-card {
          padding: 20px;
          border-radius: 8px;
        }

        .insight-card.top-seller {
          background: #e8f0fe;
        }

        .insight-card.most-improved {
          background: #e6f4ea;
        }

        .insight-card h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          color: #333;
        }

        .insight-card p {
          margin: 0;
          color: #666;
        }

        footer {
          text-align: center;
          color: #666;
          margin-top: 40px;
        }
      `}</style>
    </div>
  )
}