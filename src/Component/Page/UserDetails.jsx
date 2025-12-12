import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

export default function UserDetails() {
  const user = useLoaderData(); // Use 'user' instead of 'data'
  
  const handlePrint = () => window.print();

  // Check if user data exists
  if (!user) {
    return (
      <div style={{
        width: "400px",
        margin: "20px auto",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial",
      }}>
        <h2>User not found</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  return (
    <div style={{
      width: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontFamily: "Arial",
      backgroundColor: "#f9f9f9",
    }}>
      
      <h2 style={{ textAlign: "center", color: "#333" }}>User Details</h2>

      {user?.image && (
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <img 
            src={user.image} 
            alt="User" 
            style={{ 
              width: "120px", 
              height: "120px", 
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #4CAF50"
            }} 
          />
        </div>
      )}

      <div style={{ 
        backgroundColor: "white", 
        padding: "15px", 
        borderRadius: "5px",
        marginBottom: "10px" 
      }}>
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
        <p><strong>Gender:</strong> {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "N/A"}</p>
        <p><strong>Address:</strong> {user?.address || "N/A"}</p>
        <p><strong>Company:</strong> {user?.company || "N/A"}</p>
        <p><strong>Position:</strong> {user?.position || "N/A"}</p>
        <p><strong>Department:</strong> {user?.department || "N/A"}</p>
      </div>

      {user?.description && (
        <div style={{ 
          backgroundColor: "white", 
          padding: "15px", 
          borderRadius: "5px",
          marginBottom: "10px" 
        }}>
          <p style={{ marginTop: "10px" }}>
            <strong>Description:</strong> 
            <div style={{ 
              marginTop: "5px", 
              padding: "10px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
              {user.description}
            </div>
          </p>
        </div>
      )}

      <div style={{ 
        marginTop: "15px", 
        display: "flex", 
        gap: "10px",
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "5px"
      }}>
        <Link 
          to={`/update/${ user?._id}`}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #4CAF50",
            borderRadius: "5px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
            textDecoration: "none",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Update User
        </Link>

        <button 
          onClick={handlePrint}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #333",
            borderRadius: "5px",
            background: "#333",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Print
        </button>
      </div>

      <div style={{ 
        marginTop: "15px", 
        textAlign: "center" 
      }}>
        <Link 
          to="/"
          style={{
            color: "#666",
            textDecoration: "none",
            fontSize: "14px"
          }}
        >
          ← Back to Users List
        </Link>
      </div>

    </div>
  );
}