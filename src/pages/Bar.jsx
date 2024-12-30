import React, { useEffect, useState } from "react";
import axios from "axios";
import BarMenu from "../components/maincomponents/BarMenu";
import BillModal from "../components/maincomponents/BillModal";
import AddMore from "../components/maincomponents/AddMore";
import KOTmodal from "../components/maincomponents/KOTmodal";
function Bar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showBill, setShowBill] = useState(null);
const [showKot, setShowKot] = useState(null);
  const [activeStaff,setActiveStaff] = useState([])
  

  const [tables, setTables] = useState([]);
  useEffect(() => {
    fetchTable();
    fetchCurrentUser();
  }, []);
  const fetchTable = async () => {
    try {
      const response = await axios.get("http://localhost:3002/tables", {
        withCredentials: true,
      });
      setTables(response.data);
      const staffData = response.data
        .filter((table) => table.status === "occupied" && table.served_by)
        .reduce((acc, table) => {
          const staff = table.served_by;
          if (!acc[staff.emp_no]) {
            acc[staff.emp_no] = {
              name: `${staff.fname} ${staff.lname}`,
              tables: [],
            };
          }
          acc[staff.emp_no].tables.push(table.table_number);
          return acc;
        }, {});

      setActiveStaff(Object.values(staffData));
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3002/current-user", {
        withCredentials: true,
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const canManageTable = (table) => {
    return (
      currentUser &&
      table.served_by &&
      currentUser.user.emp_no === table.served_by.emp_no
    );
  };

  const [selectedTable, setSelectedTable] = useState(null);
  const [selected2, setSelected2] = useState(null)

  const handleAssign = (table) => {
    setSelectedTable(table);
  };
  const handleAdd = (table) =>{
    setSelected2(table);
  };

  const handlePrintBill = async (table_number) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/bar_bills/table/${table_number}`,
        {
          withCredentials: true,
        }
      );
      setShowBill(response.data);
    } catch (error) {
      console.error("Error fetching bill:", error);
    }
  };

  const handlePrintKOT = async (table) => {
    if (!table.billId) {
      try {
        const response = await axios.get(
          `http://localhost:3002/bills/table/${table.table_number}`,
          {
            withCredentials: true,
          }
        );
        const billId = response.data._id;

        const updatedTables = tables.map((t) =>
          t._id === table._id ? { ...t, billId } : t
        );
        setTables(updatedTables);

        fetchKOT(billId);
      } catch (error) {
        console.error("Error fetching bill for KOT:", error);
      }
    } else {
      fetchKOT(table.billId);
    }
  };

  const fetchKOT = async (billId) => {
    try {
      const response = await axios.get(`http://localhost:3002/kot/${billId}`, {
        withCredentials: true,
      });

      const kotData = response.data;
      setShowKot(kotData);
    } catch (error) {
      console.error("Error fetching KOT:", error);
    }
  };
  return (
    <div className="table-management">
      <header className="header">
        <div className="title-section">
          <h1>Table Management</h1>
          <div className="status-indicators">
            <div className="status-item">
              <span className="status-dot vacant"></span>
              <span>Vacant</span>
            </div>
            <div className="status-item">
              <span className="status-dot occupied"></span>
              <span>Occupied</span>
            </div>
            <div className="status-item">
              <span className="status-dot reserved"></span>
              <span>Reserved</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <select className="table-filter">
            <option value="all">All Tables</option>
            <option value="vacant">Vacant</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
      </header>

      <section className="active-staff">
        <h2>Active Staff</h2>
        <div className="staff-list">
          {activeStaff.map((staff) => (
            <div key={staff.id} className="staff-card">
              <img
                src={staff.avatar}
                className="staff-avatar"
              />
              <div className="staff-info">
                <span className="staff-name">{staff.name}</span>
                <span className="staff-tables">Tables: {staff.tables.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tables-grid">
        {tables.map((table) => (
          <div key={table._id} className={`table-card ${table.status}`}>
            <div className="table-header">
              <h3>Table {table.table_number}</h3>
              <span className="seats-count">{table.seats_available} Seats</span>
            </div>

            {table.served_by && (
              <div className="table-staff">
                <span>
                  Served By: {table.served_by.fname} {table.served_by.lname}
                </span>
              </div>
            )}

            {table.status === "occupied" && (
              <>
                <div className="table-time">
                  Served AT: {new Date(table.createdAt).toLocaleString()}
                </div>
                {canManageTable(table) && (
                  <div className="table-actions">
                    <button
                      className="print-bill-button"
                      onClick={() => handlePrintBill(table.table_number)}
                    >
                      Print Bill
                    </button>
                    <button className="print-bill-button" onClick={() => handlePrintKOT(table)}>Print Kot</button>
                    <button className="add-items-button" onClick={() => handleAdd(table)}>Add More Items</button>
                  </div>
                )}
              </>
            )}

            {table.status === "reserved" && (
              <div className="table-time">
                Reserved: {table.reservationTime}
              </div>
            )}

            {table.status === "cleaning" && (
              <div className="table-time">Available in {table.availableIn}</div>
            )}

            {table.status === "vacant" && (
              <button
                className="assign-button"
                onClick={() => handleAssign(table)}
              >
                Assign
              </button>
            )}
          </div>
        ))}
      </section>

      <div className="notification-toast">
        <span className="notification-icon">⚠️</span>
        <div className="notification-content">
          <strong>Table 5 needs attention</strong>
          <p>Guests waiting to order</p>
        </div>
        <button className="close-notification">×</button>
      </div>
      {selectedTable && (
        <BarMenu
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}
      {showBill && (
        <BillModal billDetails={showBill} onClose={() => setShowBill(null)} />
      )}
      {selected2 && (
        <AddMore table={selected2} onClose={() =>setSelected2(null)}/>
      )}
      {showKot && (
        <KOTmodal kotDetails={showKot} onClose={() => setShowKot(null)} />
      )}
      <style jsx>{`
        root {
          --color-vacant: #22c55e;
          --color-occupied: #ef4444;
          --color-reserved: #f59e0b;
          --color-cleaning: #3b82f6;
          --color-text-primary: #1e293b;
          --color-text-secondary: #64748b;
          --color-border: #e2e8f0;
          --color-background: #f8fafc;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .table-management {
          padding: 24px;
          background-color: #f8fafc;
          min-height: 100vh;
        }

        .header {
          margin-bottom: 32px;
        }

        .title-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .title-section h1 {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .status-indicators {
          display: flex;
          gap: 16px;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.vacant {
          background-color: #22c55e;
        }
        .status-dot.occupied {
          background-color: #ef4444;
        }
        .status-dot.reserved {
          background-color: #f59e0b;
        }

        .header-actions {
          display: flex;
          gap: 16px;
        }

        .search-bar {
          position: relative;
          flex: 1;
          max-width: 300px;
        }

        .search-bar input {
          width: 90%;
          padding: 8px 16px;
          padding-left: 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-bar input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 14px;
        }

        .table-filter {
          padding: 8px 16px;
          border: 1px solid;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          background-color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: 20px;
        }

        .table-filter:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .active-staff {
          margin-bottom: 32px;
        }

        .active-staff h2 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .staff-list {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .staff-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          min-width: 200px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .staff-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .staff-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .staff-info {
          display: flex;
          flex-direction: column;
        }

        .staff-name {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
        }

        .staff-tables {
          font-size: 12px;
          color: var(--color-text-secondary);
        }

        .tables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
        }

        .table-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .table-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .table-card.vacant {
          border-left: 4px solid #22c55e;
        }

        .table-card.occupied {
          border-left: 4px solid #ef4444
        }

        .table-card.reserved {
          border-left: 4px solid #f59e0b;
        }

        .table-card.cleaning {
          border-left: 4px solid #3b82f6;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .table-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b
          margin: 0;
        }

        .print-bill-button,
        .add-items-button {
          flex: 1;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 5px;

        }

        .print-bill-button {
          background-color: #22c55e;
          color: white;
          margin-right: 10px;
        }

        .print-bill-button:hover {
          background-color: #16a34a;
        }

        .add-items-button {
          background-color: #3b82f6;
          color: white;
        }

        .add-items-button:hover {
          background-color: #2563eb;
        }

        .seats-count {
          font-size: 13px;
          color: var(--color-text-secondary);
          background: var(--color-background);
          padding: 4px 8px;
          border-radius: 6px;
        }

        .table-staff {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .table-staff img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .table-staff span {
          font-size: 13px;
          color: var(--color-text-secondary);
        }

        .table-time {
          font-size: 13px;
          color: var(--color-text-secondary);
          margin-top: 8px;
        }

        .notification-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          animation: slideIn 0.3s ease;
        }

        .notification-icon {
          font-size: 20px;
        }

        .notification-content {
          display: flex;
          flex-direction: column;
        }

        .notification-content strong {
          font-size: 14px;
          color: var(--color-text-primary);
        }

        .notification-content p {
          font-size: 13px;
          color: #e2e8f0;
          margin: 0;
        }

        .close-notification {
          background: none;
          border: none;
          font-size: 20px;
          color: #e2e8f0;
          cursor: pointer;
          padding: 4px;
          margin: -4px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .close-notification:hover {
          background: var(--color-background);
          color: var(--color-text-primary);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .table-management {
            padding: 16px;
          }

          .title-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .header-actions {
            flex-direction: column;
            gap: 12px;
          }

          .search-bar {
            max-width: none;
          }

          .tables-grid {
            grid-template-columns: 1fr;
          }

          .notification-toast {
            left: 16px;
            right: 16px;
            bottom: 16px;
          }
        }

        .assign-button {
          margin-top: 12px;
          padding: 8px 16px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .assign-button:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  );
}

export default Bar;
