import React from 'react';

function LowStockItems({ items }) {
  return (
    <section className="low-stock-section">
      <h2>Low Stock Items</h2>
      <div className="low-stock-items">
        {items.map((item, index) => (
          <div key={index} className="low-stock-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="stock-label">Low Stock</p>
            <p>Current Stock: {item.quantity}</p>
            <p>Minimum Stock: 10</p>
            <button className="reorder-btn">
              Reorder Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LowStockItems;
