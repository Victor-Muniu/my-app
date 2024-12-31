import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import BillCard from './BillCard';
import Logo from "../../images/Logo.jpg"

const AUTHORIZED_ROLES = ['admin', 'Receptionist', 'General Manager'];

const BillManager = ({ uncleared, uncleared2, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [tableFilter, setTableFilter] = useState('all');
  const [filteredBills, setFilteredBills] = useState([]);

  const canMarkPaid = AUTHORIZED_ROLES.includes(currentUser?.user?.role);

  useEffect(() => {
    const allBills = getNotClearedBills();
    let filtered = [...allBills];

    if (searchQuery) {
      filtered = filtered.filter((bill) =>
        bill.table.table_number.toString().includes(searchQuery) ||
        bill.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

   
    if (statusFilter !== 'all') {
      filtered = filtered.filter((bill) => bill.status === statusFilter);
    }


    if (tableFilter !== 'all') {
      filtered = filtered.filter((bill) =>
        bill.table.table_number.toString() === tableFilter
      );
    }

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter((bill) => {
        const billDate = new Date(bill.order_time).toISOString().split('T')[0];
        return billDate === dateFilter;
      });
    }

    setFilteredBills(filtered);
  }, [searchQuery, statusFilter, dateFilter, tableFilter, uncleared, uncleared2]);

  const getNotClearedBills = () => {
    if (!currentUser?.user?.emp_no) {
      return [];
    }

    const restaurantBills = uncleared.filter(
      (bill) => canMarkPaid || bill.served_by?.emp_no === currentUser.user.emp_no
    );

    const barBills = uncleared2.filter(
      (bill) => canMarkPaid || bill.served_by?.emp_no === currentUser.user.emp_no
    );

    return [...restaurantBills, ...barBills];
  };

  const handleMarkPaid = (billId) => {
    console.log('Marking bill as paid:', billId);
  };

  const handleView = (billId) => {
    console.log('Viewing bill:', billId);
  };

  const handleRemind = (billId) => {
    console.log('Sending reminder for bill:', billId);
  };

  return (
    <div className="bill-manager">
      <header className="header">
        <div className="title-section">
          <div className="logo">
            <img src={Logo} alt="Restaurant Logo" width='250px' height='auto'/>
          </div>
          <div className="title">
            <h1>Epashikino Resort & Spa</h1>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="content">
        <h2>Uncleared Bills</h2>

        <div className="filters">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="partially_paid">Partially Paid</option>
            </select>

            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tables</option>
              {Array.from(new Set([...uncleared, ...uncleared2].map((bill) => bill.table.table_number)))
                .sort((a, b) => a - b)
                .map((table) => (
                  <option key={table} value={table}>
                    Table {table}
                  </option>
                ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="date-filter"
            />
          </div>
        </div>

        <div className="bills-grid">
          {filteredBills.map((bill) => (
            <BillCard
              key={bill._id}
              bill={bill}
              canMarkPaid={canMarkPaid}
              onMarkPaid={handleMarkPaid}
              onView={handleView}
              onRemind={handleRemind}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .bill-manager {
          min-height: 100vh;
          background: #f9fafb;
        }

        .header {
          background: white;
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          font-size: 24px;
        }

        .title h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .title p {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .content {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          margin: 0 0 24px;
          font-size: 24px;
          font-weight: 600;
        }

        .filters {
          margin-bottom: 24px;
        }

        .search-bar {
          position: relative;
          margin-bottom: 16px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .search-bar input {
          width: 90%;
          padding: 10px 12px 10px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
        }

        .filter-group {
          display: flex;
          gap: 12px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          min-width: 150px;
        }

        .date-filter {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
        }

        .bills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        @media (max-width: 768px) {
          .filter-group {
            flex-direction: column;
          }

          .bills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BillManager;
