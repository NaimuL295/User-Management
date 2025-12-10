import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        backgroundColor: "white",
        borderBottom: "1px solid #e5e5e5",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo / Title */}
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          textDecoration: "none",
          color: "#333",
        }}
      >
    User-management
      </Link>

      {/* Menu Items */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/alluser"
          style={{
            textDecoration: "none",
            fontSize: "22px",
            color: "#090909ff",
            padding: "6px 12px",
            borderRadius: "6px",
            fontWeight:"bold",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          All Users
        </Link>

      
      </div>
    </div>
  );
}
