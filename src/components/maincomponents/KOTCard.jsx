import React, { useState, useEffect } from "react";
import { Search, Calendar } from "lucide-react";
import Card from "./Card";
import Logo from "../../images/Logo.jpg"
function KOTCard({ kots }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filteredKOTs, setFilteredKOTs] = useState(kots);
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");

  const staffColors = new Map();
  const generateStaffColor = (staffId) => {
    if (!staffColors.has(staffId)) {
      const colors = [
        "#3b82f6",
        "#ef4444",
        "#22c55e",
        "#f59e0b",
        "#6366f1",
        "#ec4899",
        "#8b5cf6",
        "#14b8a6",
      ];
      staffColors.set(staffId, colors[staffColors.size % colors.length]);
    }
    return staffColors.get(staffId);
  };

  useEffect(() => {
    let filtered = [...kots];

    filtered = filtered.filter((kot) => {
      const kotDate = new Date(kot.created_at).toISOString().split("T")[0];
      return kotDate === selectedDate;
    });

    if (searchQuery) {
      filtered = filtered.filter(
        (kot) =>
          kot.bill?.table.table_number.toString().includes(searchQuery) ||
          kot.items.some((item) =>
            item.menu_item?.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (kot) => kot.bill?.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (staffFilter !== "all") {
      filtered = filtered.filter(
        (kot) => kot.bill?.served_by._id === staffFilter
      );
    }

    setFilteredKOTs(filtered);
  }, [searchQuery, selectedDate, statusFilter, staffFilter, kots]);
  return (
    <div className="kot-manager">
      <header className="header">
        <div className="title-section">
          <div className="logo">
          <img src={Logo} alt="Restaurant Logo" width='250px' height='auto'/>
          </div>
          <div className="title">
            <h1>Epashikino Resort & Spa</h1>
            
          </div>
        </div>
        <div className="date-time">
          <div className="current-date">{new Date().toLocaleDateString()}</div>
          <div className="current-time">{new Date().toLocaleTimeString()}</div>
        </div>
      </header>

      <div className="filters">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search KOT, Table, or Staff..."
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
            <option value="new">New</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Staff</option>
            {Array.from(
              new Set(kots.map((kot) => kot.bill?.served_by._id))
            ).map((staffId) => {
              const staff = kots.find(
                (kot) => kot.bill?.served_by._id === staffId
              )?.bill?.served_by;
              return staff ? (
                <option key={staff._id} value={staff._id}>
                  {staff.fname} {staff.lname}
                </option>
              ) : null;
            })}
          </select>

          <div className="date-picker">
            <Calendar className="calendar-icon" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      </div>

      <div className="kots-grid">
        {filteredKOTs.map((kot) => (
          <Card
            key={kot._id}
            kot={kot}
            staffColor={generateStaffColor(kot.bill?.served_by._id)}
          />
        ))}
      </div>

      <style jsx>{`
        .kot-manager {
          padding: 20px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          font-size: 32px;
        }

        .title h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }

        .title p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .date-time {
          text-align: right;
        }

        .current-date {
          font-weight: 500;
        }

        .current-time {
          color: #64748b;
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
          color: #64748b;
          width: 20px;
          height: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
        }

        .filter-group {
          display: flex;
          gap: 12px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          min-width: 150px;
        }

        .date-picker {
          position: relative;
        }

        .calendar-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          width: 20px;
          height: 20px;
        }

        .date-input {
          padding: 8px 12px 8px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
        }

        .kots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        @media (max-width: 768px) {
          .filter-group {
            flex-direction: column;
          }

          .kots-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default KOTCard;
