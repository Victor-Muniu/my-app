import React, { useEffect, useState } from "react";
import { Bell, Search, Filter, Plus, X } from "lucide-react";
import Logo from "../images/Logo.jpg";
function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [activeFloor, setActiveFloor] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "Single",
    status: "Vacant",
    pricePerNight: "",
    floor: "1",
  });

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:3002/rooms");
      const data = await response.json();
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pricePerNight: Number(formData.pricePerNight),
          floor: Number(formData.floor),
          days_Occupied: 0,
          lastCleaned: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        fetchRooms();
        setShowAddForm(false);
        setFormData({
          roomNumber: "",
          type: "Single",
          status: "Vacant",
          pricePerNight: "",
          floor: "1",
        });
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    const statusMap = {
      Vacant: "#4CAF50",
      Occupied: "#FF5252",
      Cleaning: "#FFC107",
      Maintenance: "#757575",
    };
    return statusMap[status] || "#2196F3";
  };

  const filteredRooms = rooms.filter((room) => room.floor === activeFloor);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="dashboard">
      {showAddForm && (
        <div className="form-overlay">
          <div className="add-room-form">
            <div className="form-header">
              <h2>Add New Room</h2>
              <button
                className="close-button"
                onClick={() => setShowAddForm(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="roomNumber">Room Number</label>
                <input
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Room Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Twin">Twin</option>
                  <option value="Tripple">Tripple</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Vacant">Vacant</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="pricePerNight">Price per Night</label>
                <input
                  type="number"
                  id="pricePerNight"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="floor">Floor</label>
                <select
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <button type="submit" className="submit-button">
                Add Room
              </button>
            </form>
          </div>
        </div>
      )}

      <header className="header">
        <div className="header-left">
          <h1>Epashikino Resort & Spa</h1>
          <span className="date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <div className="avatar">
            <img src="/placeholder.svg" alt="User avatar" />
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-actions">
            <h2>Room Status Dashboard</h2>
            <button
              className="add-room-button"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={20} />
              Add Room
            </button>
          </div>
          <div className="search-filters">
            <div className="search-bar">
              <Search size={20} />
              <input type="text" placeholder="Search rooms, guests..." />
            </div>
            <button className="filter-button">
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>

        <div className="status-legend">
          <div className="status-item">
            <span className="status-dot available"></span>
            Available
          </div>
          <div className="status-item">
            <span className="status-dot occupied"></span>
            Occupied
          </div>
          <div className="status-item">
            <span className="status-dot cleaning"></span>
            Cleaning
          </div>
          <div className="status-item">
            <span className="status-dot maintenance"></span>
            Maintenance
          </div>
          <div className="status-item">
            <span className="status-dot reserved"></span>
            Reserved
          </div>
        </div>

        <div className="floor-tabs">
          {[1, 2, 3, 4].map((floor) => (
            <button
              key={floor}
              className={`floor-tab ${activeFloor === floor ? "active" : ""}`}
              onClick={() => setActiveFloor(floor)}
            >
              Floor {floor}
            </button>
          ))}
        </div>

        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <div key={room._id} className="room-card">
              <div
                className="room-status"
                style={{ backgroundColor: getStatusColor(room.status) }}
              >
                {room.status}
              </div>
              <div className="room-info">
                <h3>Room {room.roomNumber}</h3>
                <p className="room-type">{room.type}</p>
                <div className="room-details">
                  <p>KSh {room.pricePerNight}/night</p>
                  <p>Floor {room.floor}</p>
                </div>
                <div className="room-cleaning">
                  Last cleaned:{" "}
                  {new Date(room.lastCleaned).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-left h1 {
          margin: 0;
          font-size: 24px;
          color: #1a1a1a;
        }

        .date {
          color: #666;
          font-size: 14px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          color: #666;
        }

        .icon-button:hover {
          background-color: #f5f5f5;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .add-room-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #1a73e8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .add-room-button:hover {
          background-color: #1557b0;
        }

        .dashboard-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .search-filters {
          display: flex;
          gap: 16px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #f5f5f5;
          padding: 8px 16px;
          border-radius: 8px;
          width: 300px;
        }

        .search-bar input {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          font-size: 14px;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #f5f5f5;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .status-legend {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-dot.available {
          background-color: #4caf50;
        }
        .status-dot.occupied {
          background-color: #ff5252;
        }
        .status-dot.cleaning {
          background-color: #ffc107;
        }
        .status-dot.maintenance {
          background-color: #757575;
        }
        .status-dot.reserved {
          background-color: #2196f3;
        }

        .floor-tabs {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .floor-tab {
          padding: 8px 16px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 14px;
          border-radius: 8px;
          color: #666;
          transition: all 0.2s;
        }

        .floor-tab:hover {
          background-color: #f5f5f5;
        }

        .floor-tab.active {
          background-color: #1a73e8;
          color: white;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .room-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .room-card:hover {
          transform: translateY(-2px);
        }

        .room-status {
          color: white;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
        }

        .room-info {
          padding: 16px;
        }

        .room-info h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }

        .room-type {
          color: #666;
          margin: 0 0 16px 0;
          font-size: 14px;
        }

        .room-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .room-cleaning {
          font-size: 12px;
          color: #666;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          font-size: 18px;
          color: #666;
        }

        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .add-room-form {
          background-color: white;
          padding: 24px;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          position: relative;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .form-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 4px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1a73e8;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #1557b0;
        }
      `}</style>
    </div>
  );
}

export default Rooms;
