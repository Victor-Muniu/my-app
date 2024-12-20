import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InvoiceView from '../components/maincomponents/InvoiceView'
export default function CreditorsManagement() {
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: 'All Payment Status',
    creditTerms: 'All Credit Terms',
    date: '',
  })

  const [creditorsData, setCreditorsData]=useState([])
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async  () =>{
    try {
      const response = await axios.get('http://localhost:3002/creditors', {withCredentials: true,});
      setCreditorsData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const totalAmountOwed = () =>{
    return creditorsData.reduce((total, cred)=>{
      const credTotal = cred.total_amount
      return total + credTotal
    },0)
  }
  const amount = totalAmountOwed()

  return (
    <div className="creditors-management">
      <h1>Creditors Management</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <span className="label">Total Amount Owed</span>
          <span className="amount">Ksh {amount.toFixed(2)}</span>
        </div>
        
      </div>

      <div className="controls">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search creditors..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          
          <div className="filters">
            <select
              name="paymentStatus"
              value={filters.paymentStatus}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option>All Payment Status</option>
              <option>upaid</option>
              <option>paid</option>
              <option>Overdue</option>
            </select>

            <select
              name="creditTerms"
              value={filters.creditTerms}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option>All Credit Terms</option>
              <option>Net 30</option>
              <option>Net 60</option>
              <option>Net 90</option>
            </select>

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="filter-select"
            />

            <button className="apply-btn">Apply Filters</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="add-btn">+ Add Creditor</button>
          <button className="export-btn">↓ Export</button>
        </div>
      </div>

      <div className="creditors-table">
        <table>
          <thead>
            <tr>
              <th>CREDITOR NAME</th>
              <th>CONTACT INFO</th>
              <th>OUTSTANDING BALANCE</th>
              <th>INVOICE DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {creditorsData.map((creditor) => (
              <tr key={creditor._id}>
                <td>{creditor.supplier.name}</td>
                <td>{creditor.supplier.email}</td>
                <td>Ksh {creditor.total_amount}</td>
                <td>{new Date(creditor.date).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${creditor.status.toLowerCase()}`}>
                    {creditor.status}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="action-btn" onClick={() => handleViewInvoice(creditor)}>View</button>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Showing 1 to 10 of 97 results</span>
        <div className="pagination-controls">
          <button disabled>Previous</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>Next</button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Hotel Accounting System. All rights reserved.</p>
      </footer>

      {selectedInvoice &&(
        <InvoiceView invoice={selectedInvoice} onClose={()=>setSelectedInvoice(null)}/>
      )}

      <style jsx>{`
        .creditors-management {
          padding: 20px;
          background-color: #f5f5f5;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          color: #666;
          font-size: 14px;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .amount.overdue {
          color: #d32f2f;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 20px;
        }

        .search-filters {
          flex: 1;
        }

        .search-input {
          width: 90%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .apply-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .add-btn {
          padding: 8px 16px;
          background: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .export-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .creditors-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
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

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-badge.unpaid {
          background-color: #fef7e0;
          color: #f9ab00;
        }

        .status-badge.paid {
          background-color: #e6f4ea;
          color: #1e8e3e;
        }

        .status-badge.overdue {
          background-color: #fde7e7;
          color: #d32f2f;
        }

        .row-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 4px 8px;
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        .action-btn:hover {
          background: #f5f5f5;
        }

        .action-btn.delete {
          color: #d32f2f;
          border-color: #d32f2f;
        }

        .action-btn.delete:hover {
          background: #fde7e7;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .pagination-controls {
          display: flex;
          gap: 5px;
        }

        .pagination-controls button {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-controls button.active {
          background: #1a73e8;
          color: white;
          border-color: #1a73e8;
        }

        .pagination-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .footer {
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}