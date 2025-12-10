import React, { useState } from "react";

export default function AllUserInfo() {
  const [users, setUsers] = useState([]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Users</h2>

      {/* If no users */}
      {users.length === 0 ? (
        <p
          style={{
            fontSize: "18px",
            color: "#888",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
           User Not Found
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                Image
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                Name
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                Gender
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "10px" }}>
                  <img
                    src={user.img}
                    alt={user.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                </td>

                <td style={{ padding: "10px" }}>{user.name}</td>

                <td style={{ padding: "10px" }}>{user.gender}</td>

                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: "6px 12px",
                      border: "none",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
