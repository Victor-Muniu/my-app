import React, { useState } from 'react'

export default function SalesOverview() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPOS, setSelectedPOS] = useState('All POS')

  // Sample data
  const barSales = [
    { date: '2025-03-15', id: 'BAR-001', description: 'Cocktail Mixers', quantity: 10, unitPrice: 12.00, totalAmount: 120.00 },
    { date: '2025-03-16', id: 'BAR-002', description: 'Wine Bottles', quantity: 5, unitPrice: 25.00, totalAmount: 125.00 }
  ]

  const restaurantSales = [
    { date: '2025-03-15', id: 'RES-001', item: 'Grilled Salmon', quantity: 2, unitPrice: 24.00, totalAmount: 48.00, serviceType: 'Dine-in' },
    { date: '2025-03-16', id: 'RES-002', item: 'Caesar Salad', quantity: 1, unitPrice: 12.00, totalAmount: 12.00, serviceType: 'Takeaway' }
  ]

  const amenitiesSales = [
    { date: '2025-03-15', id: 'AMN-001', item: 'Spa Service', price: 80.00, totalAmount: 80.00 },
    { date: '2025-03-16', id: 'AMN-002', item: 'Pool Access', price: 15.00, totalAmount: 15.00 }
  ]

  const laundrySales = [
    { date: '2025-03-15', id: 'LND-001', serviceType: 'Wash & Fold', price: 20.00, totalAmount: 20.00 },
    { date: '2025-03-16', id: 'LND-002', serviceType: 'Dry Cleaning', price: 35.00, totalAmount: 35.00 }
  ]

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sales Overview</h1>
        <div style={styles.controls}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
          />
          <select 
            value={selectedPOS}
            onChange={(e) => setSelectedPOS(e.target.value)}
            style={styles.select}
          >
            <option>All POS</option>
            <option>Bar</option>
            <option>Restaurant</option>
            <option>Amenities</option>
            <option>Laundry</option>
          </select>
          <input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.exportButton}>Export</button>
          <button style={styles.printButton}>Print</button>
        </div>
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Bar Sales</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Unit Price</th>
                <th style={styles.th}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {barSales.map((sale) => (
                <tr key={sale.id}>
                  <td style={styles.td}>{sale.date}</td>
                  <td style={styles.td}>{sale.id}</td>
                  <td style={styles.td}>{sale.description}</td>
                  <td style={styles.td}>{sale.quantity}</td>
                  <td style={styles.td}>${sale.unitPrice.toFixed(2)}</td>
                  <td style={styles.td}>${sale.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.totals}>
          <p>Daily Total: $245.00</p>
          <p>Weekly Total: $1,715.00</p>
          <p>Monthly Total: $7,350.00</p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Restaurant Sales</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Food/Beverage Item</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Unit Price</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Service Type</th>
              </tr>
            </thead>
            <tbody>
              {restaurantSales.map((sale) => (
                <tr key={sale.id}>
                  <td style={styles.td}>{sale.date}</td>
                  <td style={styles.td}>{sale.id}</td>
                  <td style={styles.td}>{sale.item}</td>
                  <td style={styles.td}>{sale.quantity}</td>
                  <td style={styles.td}>${sale.unitPrice.toFixed(2)}</td>
                  <td style={styles.td}>${sale.totalAmount.toFixed(2)}</td>
                  <td style={styles.td}>{sale.serviceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Amenities Sales</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Amenity Item</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {amenitiesSales.map((sale) => (
                <tr key={sale.id}>
                  <td style={styles.td}>{sale.date}</td>
                  <td style={styles.td}>{sale.id}</td>
                  <td style={styles.td}>{sale.item}</td>
                  <td style={styles.td}>${sale.price.toFixed(2)}</td>
                  <td style={styles.td}>${sale.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Laundry Service Sales</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Service Type</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {laundrySales.map((sale) => (
                <tr key={sale.id}>
                  <td style={styles.td}>{sale.date}</td>
                  <td style={styles.td}>{sale.id}</td>
                  <td style={styles.td}>{sale.serviceType}</td>
                  <td style={styles.td}>${sale.price.toFixed(2)}</td>
                  <td style={styles.td}>${sale.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f7fb',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1a1a1a',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white',
  },
  searchInput: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '200px',
  },
  exportButton: {
    padding: '8px 16px',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  printButton: {
    padding: '8px 16px',
    backgroundColor: '#34a853',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1a1a1a',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    borderBottom: '2px solid #eee',
    backgroundColor: '#f8f9fa',
    fontWeight: '600',
    color: '#374151',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    color: '#4b5563',
  },
  totals: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#4b5563',
  },
} 
