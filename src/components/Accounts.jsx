import React from "react";

function Accounts() {
  return (
    <main className="main-content">
      <h2>Dashboard</h2>
      <div className="metrics-grid">
        <div className="metric-card revenue">
          <h3>Total Revenue</h3>
          <p className="metric-value">$1,234,567</p>
        </div>
        <div className="metric-card profit">
          <h3>Net Profit</h3>
          <p className="metric-value">$345,678</p>
        </div>
        <div className="metric-card receivables">
          <h3>Receivables</h3>
          <p className="metric-value">$89,012</p>
        </div>
        <div className="metric-card payables">
          <h3>Payables</h3>
          <p className="metric-value">$56,789</p>
        </div>
        <div className="metric-card cash-flow">
          <h3>Cash Flow</h3>
          <p className="metric-value">$123,456</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Financial Overview</h3>
          <div className="chart-placeholder">
            Chart: Monthly Purchases, Expenses, Sales, and Profit Margins
          </div>
        </div>
        <div className="chart-card">
          <h3>Budget vs. Actual Comparison</h3>
          <div className="chart-placeholder">
            Chart: Budgeted vs Actual Spending
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        <div className="transactions-card">
          <h3>Recent Bank Transactions</h3>
          <table>
            <tbody>
              <tr>
                <td>Hotel Supplies Co.</td>
                <td className="negative">-$1,234.56</td>
              </tr>
              <tr>
                <td>Guest Payment</td>
                <td className="positive">+$2,345.67</td>
              </tr>
              <tr>
                <td>Utility Bill</td>
                <td className="negative">-$789.01</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="balance-card">
          <h3>Balance Sheet Snapshot</h3>
          <table>
            <tbody>
              <tr>
                <td>Total Assets</td>
                <td>$5,678,901</td>
              </tr>
              <tr>
                <td>Total Liabilities</td>
                <td>$2,345,678</td>
              </tr>
              <tr>
                <td>Net Worth</td>
                <td>$3,333,223</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="trial-balance-card">
          <h3>Trial Balance Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Total Debits</td>
                <td>$4,567,890</td>
              </tr>
              <tr>
                <td>Total Credits</td>
                <td>$4,567,890</td>
              </tr>
              <tr>
                <td>Difference</td>
                <td>$0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* P&L Table */}
      <div className="pl-card">
        <h3>Profit and Loss Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Profit</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January 2025</td>
              <td>$100,000</td>
              <td>$75,000</td>
              <td>$25,000</td>
              <td>25%</td>
            </tr>
            <tr>
              <td>February 2025</td>
              <td>$110,000</td>
              <td>$80,000</td>
              <td>$30,000</td>
              <td>27%</td>
            </tr>
            <tr>
              <td>March 2025</td>
              <td>$120,000</td>
              <td>$85,000</td>
              <td>$35,000</td>
              <td>29%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .metric-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .metric-value {
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 10px;
          }

          .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .chart-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .chart-placeholder {
            height: 200px;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            margin-top: 10px;
          }

          .bottom-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .transactions-card,
          .balance-card,
          .trial-balance-card,
          .pl-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          th,
          td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }

          .negative {
            color: #d32f2f;
          }

          .positive {
            color: #2e7d32;
          }

          h2 {
            margin-bottom: 20px;
          }

          h3 {
            margin: 0;
            color: #333;
          }
        `}
      </style>
    </main>
  );
}

export default Accounts;
