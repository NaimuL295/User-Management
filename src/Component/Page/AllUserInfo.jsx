import React, { useEffect, useState } from "react";

export default function AllUserInfo() {
  const [users, setUsers] = useState([]);

  // Load users every 5 seconds
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/all");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    try {
      await fetch(`http://localhost:5000/delete_user/${id}`, {
        method: "DELETE",
      });

      // Remove deleted user from state
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Users</h2>

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
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>
                  <img
                    src={user.image}
                    alt={user.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                </td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.gender}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleDelete(user._id)} style={btnStyle}>
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

const thStyle = { padding: "10px", borderBottom: "1px solid #ccc" };
const tdStyle = { padding: "10px" };
const btnStyle = {
  padding: "6px 12px",
  border: "none",
  backgroundColor: "red",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
};
