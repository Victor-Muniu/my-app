import React, { useState, useEffect } from "react";
import axios from "axios";
const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SupplierAddressBook = () => {
  const [suppliers, setSupplier] = useState([]);
  useEffect(() => {
    getSupplier();
  }, []);

  const getSupplier = async () => {
    try {
      const response = await axios.get("http://localhost:3002/supplier");
      setSupplier(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const [isAddCardVisible, setIsAddCardVisible] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact_person: "",
    tel_no: "",
    credit_limit: "",
    email: "",
    VAT_No: "",
    KRA_pin: "",
  });
  const handleAddSupplier = async () => {
    try {
      await axios.post("http://localhost:3002/supplier", newSupplier);
      console.log("Supplier data successfully posted!");
      getSupplier();
    } catch (error) {
      console.error("Error adding new staff:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <header>
        <div>
          <h1>Supplier Address Book</h1>
          <p>Manage and keep track of all your suppliers with ease.</p>
        </div>
      </header>

      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search suppliers by name, contact, or address"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className="clear-button" onClick={clearSearch}>
              <XIcon />
            </button>
          )}
        </div>
        <button
          className="add-button"
          onClick={() => setIsAddCardVisible(true)}
        >
          + Add Supplier
        </button>
        {isAddCardVisible && (
          <div className="overlay">
            <div className="form-card">
              <h2>Add New Supplier</h2>
              <form onSubmit={handleAddSupplier}>
                <div className="form-group">
                  <label htmlFor="name">Supplier Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newSupplier.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_person">Contact Person</label>
                  <input
                    type="text"
                    id="contact_person"
                    name="contact_person"
                    value={newSupplier.contact_person}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="credit_limit">Credit Limit</label>
                  <input
                    type="text"
                    id="credit_limit"
                    name="credit_limit"
                    value={newSupplier.credit_limit}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tel_no">Telephone</label>
                  <input
                    type="tel"
                    id="tel_no"
                    name="tel_no"
                    value={newSupplier.tel_no}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newSupplier.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="VAT_No">VAT No</label>
                  <input
                    type="text"
                    id="VAT_No"
                    name="VAT_No"
                    value={newSupplier.VAT_No}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="KRA_pin">KRA Pin</label>
                  <input
                    type="text"
                    id="KRA_pin"
                    name="KRA_pin"
                    value={newSupplier.KRA_pin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    Add Supplier
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setIsAddCardVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>SUPPLIER NAME</th>
              <th>CONTACT PERSON</th>
              <th>CONTACT INFO</th>
              <th>CREDIT LIMIT</th>
              <th>VAT No</th>
              <th>KRA Pin</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact_person}</td>
                <td>
                  <div className="contact-info">
                    <div>{supplier.tel_no}</div>
                    <div>{supplier.email}</div>
                  </div>
                </td>
                <td>Ksh {supplier.credit_limit}</td>
                <td>{supplier.VAT_No}</td>
                <td>{supplier.KRA_pin}</td>
                <td>
                  <div className="actions">
                    <button className="icon-button">
                      <PencilIcon />
                    </button>
                    <button className="icon-button delete">
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        header {
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: #111827;
        }

        header p {
          margin: 0.5rem 0 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .form-card {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 400px;
          max-width: calc(100% - 40px);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 50px;
          z-index: 999;
        }
        h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .submit-button,
        .cancel-button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }
        .submit-button {
          background-color: #2563eb;
          color: white;
        }
        .submit-button:hover {
          background-color: #1d4ed8;
        }
        .cancel-button {
          background-color: #f3f4f6;
          color: #374151;
        }
        .cancel-button:hover {
          background-color: #e5e7eb;
        }

        .search-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .search-input-container {
          flex: 1;
          position: relative;
        }

        .search-input-container input {
          width: 90%;
          padding: 0.625rem 2.5rem 0.625rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .search-input-container input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 1px #2563eb;
        }

        .clear-button {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 0.25rem;
        }

        .add-button {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 0.625rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
        }

        .add-button:hover {
          background-color: #1d4ed8;
        }

        .table-container {
          overflow-x: auto;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        th {
          background-color: #f9fafb;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 500;
          color: #6b7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        td {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          color: #111827;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          color: #6b7280;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-button {
          padding: 0.375rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          border-radius: 0.25rem;
        }

        .icon-button:hover {
          background-color: #f3f4f6;
          color: #111827;
        }

        .icon-button.delete:hover {
          background-color: #fee2e2;
          color: #dc2626;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .search-bar {
            flex-direction: column;
          }

          .add-button {
            width: 100%;
          }

          th,
          td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SupplierAddressBook;
