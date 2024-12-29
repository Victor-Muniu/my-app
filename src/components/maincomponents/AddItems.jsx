import React, { useState, useEffect } from "react";
import axios from "axios";
function AddItems({ table, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentOrder, setCurrentOrder] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orderToPost, setOrderToPost] = useState({
    menu_items: [],
  });
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:3002/menu", {
        withCredentials: true,
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const addToOrder = (item) => {
    setCurrentOrder((prevState) => {
      const existingItem = prevState.find(
        (orderItem) => orderItem.id === item._id
      );
      if (existingItem) {
        return prevState.map((orderItem) =>
          orderItem.id === item._id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [
        ...prevState,
        { id: item._id, name: item.name, price: item.price, quantity: 1 },
      ];
    });

    updateOrderToPost(item._id, item.name, 1);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCurrentOrder((prevState) =>
        prevState.filter((item) => item.id !== itemId)
      );
      updateOrderToPost(itemId, "", 0, true);
    } else {
      setCurrentOrder((prevState) =>
        prevState.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      const item = currentOrder.find((item) => item.id === itemId);
      if (item) {
        updateOrderToPost(itemId, item.name, newQuantity);
      }
    }
  };

  const updateOrderToPost = (itemId, itemName, quantity, remove = false) => {
    setOrderToPost((prevState) => {
      const existingItemIndex = prevState.menu_items.findIndex(
        (item) => item.name === itemName
      );
      if (existingItemIndex > -1) {
        if (remove) {
          return {
            ...prevState,
            menu_items: prevState.menu_items.filter(
              (item) => item.name !== itemName
            ),
          };
        }
        return {
          ...prevState,
          menu_items: prevState.menu_items.map((item, index) =>
            index === existingItemIndex ? { ...item, quantity } : item
          ),
        };
      }
      return {
        ...prevState,
        menu_items: [...prevState.menu_items, { name: itemName, quantity }],
      };
    });
  };

  const clearOrder = () => {
    setCurrentOrder([]);
    setOrderToPost({
      menu_items: [],
    });
  };

  const sendToKitchen = async () => {
    try {
      await axios.post(
        `http://localhost:3002/bills/table/${table.table_number}/add-items`,
        orderToPost,
        {
          withCredentials: true,
        }
      );
      console.log("Order sent to kitchen:", orderToPost);
      clearOrder();
      onClose();
    } catch (error) {
      console.error("Error sending order to kitchen:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const subtotal = currentOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="menu-overlay">
      <div className="menu-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="menu-content">
          <div className="menu-header">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <div className="menu-actions">
              <button className="action-button">Filter</button>
              <button className="action-button">Sort</button>
            </div>
          </div>

          <div className="menu-items">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="menu-item"
                onClick={() => addToOrder(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  <div className="item-tags">
                    {item.accompaniments.map((tag) => (
                      <span
                        key={tag}
                        className={`tag tag-${tag.toLowerCase()}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-panel">
          <h2>Current Order</h2>
          <div className="order-items">
            {currentOrder.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-details">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-actions">
            <button
              className="send-button"
              onClick={sendToKitchen}
              disabled={currentOrder.length === 0}
            >
              Send to Kitchen
            </button>
            <button
              className="clear-button"
              onClick={clearOrder}
              disabled={currentOrder.length === 0}
            >
              Clear Order
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .menu-overlay {
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

        .menu-container {
          display: flex;
          width: 90%;
          height: 90%;
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background-color: #f1f5f9;
          color: #64748b;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background-color: #e2e8f0;
          color: #1e293b;
        }

        .menu-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow-y: auto;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
        }

        .menu-actions {
          display: flex;
          gap: 12px;
        }

        .action-button {
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: white;
          cursor: pointer;
        }

        .action-button:hover {
          background-color: #f8fafc;
        }

        .menu-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .menu-item {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .menu-item:hover {
          transform: translateY(-4px);
        }

        .item-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .item-details {
          padding: 16px;
        }

        .item-details h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }

        .item-details p {
          margin: 0 0 12px 0;
          color: #64748b;
        }

        .item-price {
          font-size: 18px;
          font-weight: bold;
          color: #3b82f6;
        }

        .item-tags {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .tag {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .tag-spicy {
          background-color: #fee2e2;
          color: #ef4444;
        }

        .tag-veg {
          background-color: #dcfce7;
          color: #22c55e;
        }

        .tag-popular {
          background-color: #fef3c7;
          color: #f59e0b;
        }

        .order-panel {
          width: 400px;
          background-color: #f8fafc;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .order-panel h2 {
          margin: 0 0 24px 0;
        }

        .order-items {
          flex: 1;
          overflow-y: auto;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .order-item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .quantity-controls button {
          width: 24px;
          height: 24px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          background-color: white;
          cursor: pointer;
        }

        .quantity-controls button:hover {
          background-color: #f8fafc;
        }

        .order-summary {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .summary-row.total {
          font-weight: bold;
        }

        .order-actions {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .send-button,
        .clear-button {
          padding: 12px 0;
          border: none;
          border-radius: 8px;
          background-color: #3b82f6;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .send-button:disabled,
        .clear-button:disabled {
          background-color: #e2e8f0;
          cursor: not-allowed;
        }

        .send-button:hover,
        .clear-button:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  );
}

export default AddItems;
