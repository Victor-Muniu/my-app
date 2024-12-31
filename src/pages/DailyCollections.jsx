import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function DailyCollections() {
  const [newCollection, setNewCollection] = useState({
    emp_no: '',
    initialFloat: 0,
    cash: 0,
    mpesa: 0,
    equity: 0,
    pesaPal: 0,
    cheque: 0,
    comments: ''
  })

  const [isAddFormVisible, setIsAddFormVisible] = useState(false)

  const [dailyCollectionsData, setDailyCollectionsData]=useState([])
  useEffect(()=>{
    fetchDailyCollectionsData()
  },[])
  const fetchDailyCollectionsData = async () =>{
    try {
      const response = await axios.get('http://localhost:3002/daily-collections');
      setDailyCollectionsData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  }

  const handleAddCollection = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3002/daily-collections', newCollection)
      fetchDailyCollectionsData()
      setIsAddFormVisible(false)
      setNewCollection({
        emp_no: '',
        initialFloat: 0,
        cash: 0,
        mpesa: 0,
        equity: 0,
        pesaPal: 0,
        cheque: 0,
        comments: ''
      })
    } catch (error) {
      console.error("Error adding new collection:", error)
    }
  }
  

  const handleNewCollectionChange = (e) => {
    const { name, value } = e.target
    setNewCollection(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const totalCollection = () => {
    return dailyCollectionsData.reduce((total, data) => {
      const collection = data.totalCollection || 0; 
      return total + collection;
    }, 0);
  };
  const totalDailyCollection = totalCollection();

  const totalCash = () =>{
    return dailyCollectionsData.reduce((total, data)=>{
      const cash = data.cash 
      return total + cash
    },0)
  }
  const accumulatedCash = totalCash()

  const totalMpesa = () =>{
    return dailyCollectionsData.reduce((total, data)=>{
      const mpesa = data.mpesa
      return total + mpesa
    },0)
  }
  const accumulatedMpesa = totalMpesa()

  const totalPesaPal = () => {
    return dailyCollectionsData.reduce((total, data) => {
      const pesaPal = data.pesaPal || 0;
      return total + pesaPal;
    }, 0);
  };
  const accumulatedPesaPal = totalPesaPal();
  
  const totalEquity = () => {
    return dailyCollectionsData.reduce((total, data) => {
      const equity = data.equity || 0;
      return total + equity;
    }, 0);
  };
  const accumulatedEquity = totalEquity();
  
  const totalCheque = () => {
    return dailyCollectionsData.reduce((total, data) => {
      const cheque = data.cheque || 0;
      return total + cheque;
    }, 0);
  };
  const accumulatedCheque = totalCheque();

  return (
    <div className="daily-collections">
      <header>
        <h1>Daily Collections Page</h1>
        <p className="subtitle">Hotel Accounting System</p>
        <button className="add-btn" onClick={() => setIsAddFormVisible(true)}>+ Add Collection</button>
      </header>

      {isAddFormVisible && (
        <div className="add-form-overlay">
          <div className="add-form">
            <h2>Add New Collection</h2>
            <form onSubmit={handleAddCollection}>
              <div className="form-group">
                <label htmlFor="emp_no">Employee Number:</label>
                <input
                  type="text"
                  id="emp_no"
                  name="emp_no"
                  value={newCollection.emp_no}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="initialFloat">Initial Float:</label>
                <input
                  type="number"
                  id="initialFloat"
                  name="initialFloat"
                  value={newCollection.initialFloat}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cash">Cash:</label>
                <input
                  type="number"
                  id="cash"
                  name="cash"
                  value={newCollection.cash}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mpesa">M-Pesa:</label>
                <input
                  type="number"
                  id="mpesa"
                  name="mpesa"
                  value={newCollection.mpesa}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="equity">Equity:</label>
                <input
                  type="number"
                  id="equity"
                  name="equity"
                  value={newCollection.equity}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pesaPal">PesaPal:</label>
                <input
                  type="number"
                  id="pesaPal"
                  name="pesaPal"
                  value={newCollection.pesaPal}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cheque">Cheque:</label>
                <input
                  type="number"
                  id="cheque"
                  name="cheque"
                  value={newCollection.cheque}
                  onChange={handleNewCollectionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={newCollection.comments}
                  onChange={handleNewCollectionChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Add Collection</button>
                <button type="button" className="cancel-btn" onClick={() => setIsAddFormVisible(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="collection-summary">
        <h2>Daily Collection Summary</h2>
        <div className="summary-grid">
          <div className="summary-card collected">
            <h3>Total Amount Collected</h3>
            <p className="amount">{totalDailyCollection}</p>
          </div>
          <div className="summary-card expected">
            <h3>Expected Collection</h3>
            <p className="amount">Ksh 25,000.00</p>
          </div>
          <div className="summary-card variance">
            <h3>Variance</h3>
            <p className="amount negative">-Ksh 432.11</p>
          </div>
          <div className="summary-card outstanding">
            <h3>Outstanding Amount</h3>
            <p className="amount">Ksh 1,234.56</p>
          </div>
        </div>
      </section>

      <section className="payment-methods">
        <h2>Payment Methods Summary</h2>
        <div className="payment-grid">
          <div className="payment-card">
            <h3>Cash Payment</h3>
            <p className="amount">{accumulatedCash}</p>
          </div>
          <div className="payment-card">
            <h3>Mpesa Payment</h3>
            <p className="amount">{accumulatedMpesa}</p>
          </div>
          <div className="payment-card">
            <h3>Equity Payment</h3>
            <p className="amount">{accumulatedEquity}</p>
          </div>
          <div className="payment-card">
            <h3>PesaPal Payments</h3>
            <p className="amount">{accumulatedPesaPal}</p>
          </div>
          <div className="payment-card">
            <h3>Cheques</h3>
            <p className="amount">{accumulatedCash}</p>
          </div>
        </div>
      </section>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>FLOAT</th>
                <th>MPESA</th>
                <th>CASH</th>
                <th>CHEQUE</th>
                <th>EQUITY</th>
                <th>PESAPAL</th>
                <th>DATE/TIME</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {dailyCollectionsData.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.staffID.fname} {transaction.staffID.lname}</td>
                  <td>{transaction.initialFloat}</td>
                  <td>{transaction.mpesa}</td>
                  <td>{transaction.cash}</td>
                  <td>{transaction.cheque}</td>
                  <td>{transaction.equity}</td>
                  <td>{transaction.pesaPal}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.totalCollection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <p>© 2025 Hotel Accounting System. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .daily-collections {
          padding: 20px;
          background-color: #f5f5f5;
          position: relative;
        }

        header {
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h1 {
          font-size: 24px;
          color: #333;
          margin: 0;
        }

        .subtitle {
          color: #666;
          margin: 5px 0 0 0;
        }

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-form-overlay {
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

        .add-form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          margin: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .add-form h2 {
          margin-top: 0;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .submit-btn,
        .cancel-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn {
          background: #1a73e8;
          color: white;
        }

        .cancel-btn {
          background: #f1f3f4;
          color: #5f6368;
        }

        h2 {
          font-size: 18px;
          color: #333;
          margin-bottom: 15px;
        }

        section {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .summary-card {
          padding: 15px;
          border-radius: 8px;
        }

        .summary-card.collected {
          background-color: #e8f0fe;
        }

        .summary-card.expected {
          background-color: #e6f4ea;
        }

        .summary-card.variance {
          background-color: #fef7e0;
        }

        .summary-card.outstanding {
          background-color: #f3e8fd;
        }

        .summary-card h3 {
          font-size: 14px;
          color: #666;
          margin: 0 0 5px 0;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }

        .negative {
          color: #d32f2f;
        }

        .payment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .payment-card {
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
        }

        .table-container {
          overflow-x: auto;
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

        footer {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-top: 40px;
        }
      `}</style>
    </div>
  )
}