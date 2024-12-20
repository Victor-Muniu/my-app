import React, { useState } from 'react'

export default function BalanceSheet() {
  const [selectedPeriod, setSelectedPeriod] = useState('')

  const currentAssets = [
    { category: 'Cash and Cash Equivalents', value: 1500000 },
    { category: 'Accounts Receivable', value: 500000 },
    { category: 'Inventory', value: 300000 },
    { category: 'Prepaid Expenses', value: 200000 },
    { category: 'Other Current Assets', value: 100000 }
  ]

  const nonCurrentAssets = [
    { category: 'Property, Plant, and Equipment', value: 7000000, depreciation: 700000 },
    { category: 'Intangible Assets', value: 1000000, depreciation: 100000 },
    { category: 'Investments', value: 600000, depreciation: 0 },
    { category: 'Other Non-Current Assets', value: 100000, depreciation: 0 }
  ]

  const currentLiabilities = [
    { category: 'Accounts Payable', value: 400000 },
    { category: 'Short-Term Debt', value: 500000 },
    { category: 'Accrued Expenses', value: 300000 },
    { category: 'Current Portion of Long-Term Debt', value: 200000 },
    { category: 'Other Current Liabilities', value: 100000 }
  ]

  const nonCurrentLiabilities = [
    { category: 'Long-Term Debt', amount: 4000000, interest: 200000 },
    { category: 'Deferred Tax Liabilities', amount: 300000, interest: 0 },
    { category: 'Pension and Retirement Obligations', amount: 200000, interest: 0 },
    { category: 'Other Non-Current Liabilities', amount: 100000, interest: 0 }
  ]

  const equity = [
    { category: "Owner's Equity", value: 3000000, changes: 0 },
    { category: 'Retained Earnings', value: 1000000, changes: 200000 },
    { category: 'Additional Paid-In Capital', value: 500000, changes: 0 },
    { category: 'Other Comprehensive Income', value: 100000, changes: 50000 },
    { category: 'Dividends Paid', value: -400000, changes: 0 }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="balance-sheet">
      <h1>Hotel Balance Sheet</h1>

      <div className="period-selector">
        <input
          type="date"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="date-input"
        />
      </div>

      <section className="overview">
        <h2>Balance Sheet Overview</h2>
        <div className="overview-cards">
          <div className="overview-card assets">
            <h3>Total Assets</h3>
            <p className="amount">$10,500,000</p>
          </div>
          <div className="overview-card liabilities">
            <h3>Total Liabilities</h3>
            <p className="amount">$6,300,000</p>
          </div>
          <div className="overview-card equity">
            <h3>Owner's Equity</h3>
            <p className="amount">$4,200,000</p>
          </div>
          <div className="overview-card net-assets">
            <h3>Net Assets</h3>
            <p className="amount">$4,200,000</p>
          </div>
        </div>
      </section>

      <section className="assets-section">
        <h2>Assets</h2>
        
        <div className="current-assets">
          <h3>Current Assets</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((asset) => (
                <tr key={asset.category}>
                  <td>{asset.category}</td>
                  <td>{formatCurrency(asset.value)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total Current Assets</td>
                <td>{formatCurrency(currentAssets.reduce((sum, asset) => sum + asset.value, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="non-current-assets">
          <h3>Non-Current Assets</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Current Value</th>
                <th>Depreciation</th>
                <th>Net Value</th>
              </tr>
            </thead>
            <tbody>
              {nonCurrentAssets.map((asset) => (
                <tr key={asset.category}>
                  <td>{asset.category}</td>
                  <td>{formatCurrency(asset.value)}</td>
                  <td>{formatCurrency(asset.depreciation)}</td>
                  <td>{formatCurrency(asset.value - asset.depreciation)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total Non-Current Assets</td>
                <td>{formatCurrency(nonCurrentAssets.reduce((sum, asset) => sum + asset.value, 0))}</td>
                <td>{formatCurrency(nonCurrentAssets.reduce((sum, asset) => sum + asset.depreciation, 0))}</td>
                <td>{formatCurrency(nonCurrentAssets.reduce((sum, asset) => sum + asset.value - asset.depreciation, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="liabilities-section">
        <h2>Liabilities</h2>

        <div className="current-liabilities">
          <h3>Current Liabilities</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Current Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentLiabilities.map((liability) => (
                <tr key={liability.category}>
                  <td>{liability.category}</td>
                  <td>{formatCurrency(liability.value)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total Current Liabilities</td>
                <td>{formatCurrency(currentLiabilities.reduce((sum, liability) => sum + liability.value, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="non-current-liabilities">
          <h3>Non-Current Liabilities</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Current Amount</th>
                <th>Interest Payable</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {nonCurrentLiabilities.map((liability) => (
                <tr key={liability.category}>
                  <td>{liability.category}</td>
                  <td>{formatCurrency(liability.amount)}</td>
                  <td>{formatCurrency(liability.interest)}</td>
                  <td>{formatCurrency(liability.amount + liability.interest)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total Non-Current Liabilities</td>
                <td>{formatCurrency(nonCurrentLiabilities.reduce((sum, liability) => sum + liability.amount, 0))}</td>
                <td>{formatCurrency(nonCurrentLiabilities.reduce((sum, liability) => sum + liability.interest, 0))}</td>
                <td>{formatCurrency(nonCurrentLiabilities.reduce((sum, liability) => sum + liability.amount + liability.interest, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="equity-section">
        <h2>Equity</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Current Value</th>
              <th>Changes/Adjustments</th>
            </tr>
          </thead>
          <tbody>
            {equity.map((item) => (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>{formatCurrency(item.value)}</td>
                <td>{item.changes ? formatCurrency(item.changes) : '-'}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>Total Equity</td>
              <td>{formatCurrency(equity.reduce((sum, item) => sum + item.value, 0))}</td>
              <td>{formatCurrency(equity.reduce((sum, item) => sum + item.changes, 0))}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="equation">
        <h2>Balance Sheet Equation</h2>
        <div className="equation-text">
          Assets ({formatCurrency(10500000)}) = Liabilities ({formatCurrency(6300000)}) + Equity ({formatCurrency(4200000)})
        </div>
      </section>

      <style jsx>{`
        .balance-sheet {
          padding: 20px;
          background-color: #f5f5f5;
        }

        h1 {
          margin-bottom: 20px;
          color: #333;
        }

        h2 {
          color: #333;
          margin-bottom: 15px;
        }

        h3 {
          color: #666;
          margin-bottom: 10px;
        }

        .period-selector {
          margin-bottom: 20px;
        }

        .date-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .overview-card {
          padding: 20px;
          border-radius: 8px;
          background: white;
        }

        .overview-card.assets {
          background-color: #e8f0fe;
        }

        .overview-card.liabilities {
          background-color: #fde7e7;
        }

        .overview-card.equity {
          background-color: #e6f4ea;
        }

        .overview-card.net-assets {
          background-color: #f3e8fd;
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

        section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
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

        .total-row {
          font-weight: bold;
          background-color: #f8f9fa;
        }

        .equation {
          text-align: center;
        }

        .equation-text {
          font-size: 18px;
          color: #333;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}