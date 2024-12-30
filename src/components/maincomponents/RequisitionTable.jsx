import React from 'react'

function RequisitionTable({ requisitions }) {
  return (
    <div className="requisition-table">
      <table>
        <thead>
          <tr>
            <th>Requisition Number</th>
            <th>Department</th>
            <th>Status</th>
            <th>Requested By</th>
            <th>Date</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.map((req) => (
            <tr key={req._id}>
              <td>{req.requisition_number}</td>
              <td>{req.department}</td>
              <td>
                <span className={`status-badge ${req.status}`}>
                  {req.status}
                </span>
              </td>
              <td>{req.requested_by.email}</td>
              <td>{new Date(req.date).toLocaleString()}</td>
              <td>
                <ul>
                  {req.inventory_items.map((item) => (
                    <li key={item._id}>
                      {item.inventory.name}: {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .requisition-table {
          margin-top: 20px;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        th {
          background-color: #f7fafc;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        tr:hover {
          background-color: #f7fafc;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        .status-badge.approved {
          background-color: #def7ec;
          color: #03543f;
        }

        .status-badge.rejected {
          background-color: #fde8e8;
          color: #9b1c1c;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  )
}

export default RequisitionTable