import React, { useEffect, useState } from "react";
import SearchBar from "../components/sidebars/SearchBar";
import LowStockItems from "../components/maincomponents/LowStockItems";
import Header from "../components/maincomponents/Header";
import Stock from "../components/maincomponents/Stock";
import AddStock from "../components/maincomponents/AddStock";
function CurioManagement() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState("grid");
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3002/curio",{withCredentials: true});
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await fetch("http://localhost:3002/curio", {withCredentials: true}, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        fetchItems();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All Categories" ||
        item.category === selectedCategory)
  );

  return (
    <div className="curio-shop">
      <Header />
      <main className="main-content">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onAddItem={() => setIsModalOpen(true)}
        />
        <LowStockItems items={items.filter((item) => item.quantity < 5)} />
        <Stock
          items={filteredItems}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </main>
      {isModalOpen && (
        <AddStock onClose={() => setIsModalOpen(false)} onSubmit={addItem} />
      )}
      <style jsx>{`
        .curio-shop {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo {
          width: 40px;
          height: 40px;
          background-color: #000;
        }

        .header h1 {
          font-size: 24px;
          margin: 0;
        }

        .header-right {
          text-align: right;
        }

        .header-right p {
          margin: 0;
          color: #666;
        }

        .search-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .search-input {
          flex: 1;
        }

        .search-input input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .search-bar select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 150px;
        }

        .add-item-btn {
          background-color: #4285f4;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .low-stock-section {
          margin-bottom: 30px;
        }

        .low-stock-items {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 10px 0;
        }

        .low-stock-card {
          min-width: 200px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .low-stock-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
        }

        .stock-label {
          color: #dc3545;
          font-weight: 500;
        }

        .reorder-btn {
          width: 100%;
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .view-toggles button {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }

        .view-toggles button.active {
          background-color: #4285f4;
          color: white;
          border-color: #4285f4;
        }

        .inventory-items.list table {
          width: 100%;
          border-collapse: collapse;
        }

        .inventory-items.list th,
        .inventory-items.list td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .item-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .item-name img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
        }

        .grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .grid-item {
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .grid-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .edit-btn,
        .delete-btn {
          flex: 1;
          padding: 6px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-btn {
          background-color: #4285f4;
          color: white;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .modal-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .modal-actions button[type="submit"] {
          background-color: #4285f4;
          color: white;
        }

        .modal-actions button[type="button"] {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
}

export default CurioManagement;
