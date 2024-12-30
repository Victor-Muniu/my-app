import React, { useState, useEffect } from "react";
import axios from "axios";
import RequisitionForm from "../components/maincomponents/RequisitionForm";
import RequisitionTable from "../components/maincomponents/RequisitionTable";
function RequisitionPage() {
  const [showForm, setShowForm] = useState(false);
  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const fetchRequisitions = async () => {
    try {
      const response = await axios.get("http://localhost:3002/requisitions", {
        withCredentials: true,
      });
      setRequisitions(response.data);
    } catch (error) {
      console.error("Error fetching requisitions:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3002/requisitions", data, {
        withCredentials: true,
      });
      setShowForm(false);
      fetchRequisitions();
    } catch (error) {
      console.error("Error submitting requisition:", error);
    }
  };
  return (
    <div className="requisition-page">
      <h1>Requisitions</h1>
      <button onClick={() => setShowForm(true)} className="create-button">
        Create a Requisition
      </button>
      {showForm && (
        <div className="form-overlay">
          <RequisitionForm
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
      <RequisitionTable requisitions={requisitions} />

      <style jsx>{`
        .requisition-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .create-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .create-button:hover {
          background-color: #45a049;
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
      `}</style>
    </div>
  );
}

export default RequisitionPage;
