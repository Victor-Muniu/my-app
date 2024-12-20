import React, { useState } from 'react'

export default function ProfitAndLoss() {
  const [dateRange, setDateRange] = useState('Last Month')

  const revenueData = [
    {
      category: 'Room Revenue',
      actual: 800000,
      budgeted: 750000,
      variance: 50000
    },
    {
      category: 'Food and Beverage',
      actual: 300000,
      budgeted: 320000,
      variance: -20000
    },
    {
      category: 'Spa and Wellness',
      actual: 100000,
      budgeted: 90000,
      variance: 10000
    },
    {
      category: 'Events and Banquets',
      actual: 40000,
      budgeted: 50000,
      variance: -10000
    },
    {
      category: 'Miscellaneous',
      actual: 10000,
      budgeted: 15000,
      variance: -5000
    }
  ]

  const expenseData = [
    {
      category: 'Cost of Goods Sold',
      actual: 300000,
      budgeted: 280000,
      variance: 20000
    },
    {
      category: 'Labor Costs',
      actual: 400000,
      budgeted: 420000,
      variance: -20000
    },
    {
      category: 'Marketing and Advertising',
      actual: 80000,
      budgeted: 75000,
      variance: 5000
    },
    {
      category: 'Utilities',
      actual: 70000,
      budgeted: 65000,
      variance: 5000
    },
    {
      category: 'Maintenance and Repairs',
      actual: 50000,
      budgeted: 60000,
      variance: -10000
    },
    {
      category: 'Insurance',
      actual: 30000,
      budgeted: 30000,
      variance: 0
    },
    {
      category: 'Depreciation and Amortization',
      actual: 15000,
      budgeted: 15000,
      variance: 0
    },
    {
      category: 'Interest Expense',
      actual: 5000,
      budgeted: 5000,
      variance: 0
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  return (
    <div className="profit-loss">
      <div className="header">
        <h1>Profit and Loss Account</h1>
        <div className="date-selector">
          <label>Select Date Range:</label>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-select"
          >
            <option>Last Month</option>
            <option>This Month</option>
            <option>Last Quarter</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="apply-btn">Apply</button>
        </div>
      </div>

      <section className="overview">
        <h2>Overview</h2>
        <div className="overview-cards">
          <div className="overview-card revenue">
            <h3>Total Revenue</h3>
            <p className="amount">$1,250,000</p>
          </div>
          <div className="overview-card expenses">
            <h3>Total Expenses</h3>
            <p className="amount">$950,000</p>
          </div>
          <div className="overview-card profit">
            <h3>Net Profit/Loss</h3>
            <p className="amount">$300,000</p>
          </div>
        </div>
      </section>

      <section className="revenue-breakdown">
        <h2>Revenue Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>ACTUAL</th>
              <th>BUDGETED</th>
              <th>VARIANCE</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item) => (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>{formatCurrency(item.actual)}</td>
                <td>{formatCurrency(item.budgeted)}</td>
                <td className={item.variance >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(item.variance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="expense-breakdown">
        <h2>Expense Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>ACTUAL</th>
              <th>BUDGETED</th>
              <th>VARIANCE</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((item) => (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>{formatCurrency(item.actual)}</td>
                <td>{formatCurrency(item.budgeted)}</td>
                <td className={item.variance <= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(item.variance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="profit-calculation">
        <h2>Profit and Loss Calculation</h2>
        <div className="calculation-items">
          <div className="calculation-item">
            <span>Gross Profit:</span>
            <span className="amount">{formatCurrency(950000)}</span>
          </div>
          <div className="calculation-item">
            <span>Operating Profit:</span>
            <span className="amount">{formatCurrency(320000)}</span>
          </div>
          <div className="calculation-item">
            <span>Net Profit:</span>
            <span className="amount positive">{formatCurrency(300000)}</span>
          </div>
        </div>
      </section>

      <section className="comparative-analysis">
        <h2>Comparative Analysis</h2>
        <div className="comparison-grid">
          <div className="comparison-card">
            <h3>Comparison to Previous Period</h3>
            <div className="comparison-item">
              <span>Revenue:</span>
              <span className="positive">{formatPercentage(5.2)}</span>
            </div>
            <div className="comparison-item">
              <span>Expenses:</span>
              <span className="negative">{formatPercentage(3.8)}</span>
            </div>
            <div className="comparison-item">
              <span>Profit:</span>
              <span className="positive">{formatPercentage(8.7)}</span>
            </div>
          </div>
          <div className="comparison-card">
            <h3>Comparison to Budget</h3>
            <div className="comparison-item">
              <span>Revenue:</span>
              <span className="positive">{formatPercentage(2.1)}</span>
            </div>
            <div className="comparison-item">
              <span>Expenses:</span>
              <span className="negative">{formatPercentage(1.5)}</span>
            </div>
            <div className="comparison-item">
              <span>Profit:</span>
              <span className="positive">{formatPercentage(3.4)}</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .profit-loss {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .date-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .date-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .apply-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .overview-card {
          padding: 20px;
          border-radius: 8px;
        }

        .overview-card.revenue {
          background-color: #e6f4ea;
        }

        .overview-card.expenses {
          background-color: #fde7e7;
        }

        .overview-card.profit {
          background-color: #e8f0fe;
        }

        .overview-card h3 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 10px 0 0 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 500;
          color: #666;
        }

        .positive {
          color: #1e8e3e;
        }

        .negative {
          color: #d32f2f;
        }

        .calculation-items {
          display: grid;
          gap: 15px;
        }

        .calculation-item {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .comparison-card {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .comparison-card h3 {
          margin: 0 0 15px 0;
          font-size: 16px;
          color: #333;
        }

        .comparison-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  )
}