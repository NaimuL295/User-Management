import React, { useEffect, useState } from "react";
import useInputSwitch from "../hook/useInputSwitch";
import { UploadImage } from "../hook/useUploadImage";
import { Link } from "react-router-dom";

export default function AddForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]); // Changed from User to users
console.log(users);

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


  // Set total number of inputs including future ones
  const { Enter, handleEnter } = useInputSwitch(10);

  // Form submit
  const handleUserInfo = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data:", data);
    
    try {
      const req = await fetch("http://localhost:5000/new_user", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          image: imageUrl
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      
      const result = await req.json();
      console.log("Response:", result);
      
      // Refresh users list after successful submission
      if (req.ok) {
        const response = await fetch("http://localhost:5000/all");
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
        
        // Reset form if needed
        form.reset();
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      {/* Left Column - All Users */}
      <div
        style={{
          flex: "1",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <h3>All Users</h3>
        {users.length > 0 ? (
          users.map((item, index) => (
            <ul key={index} style={{ listStyle: "none", padding: "5px 0" }}>
              <li>
             <Link 
  to={`/details/${item._id}`} 
  style={{ color: "black", textDecoration: "none" }}
>
  {item.name}
</Link>

              </li>
            </ul>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      {/* Right Column - Form */}
      <div
        style={{
          flex: "4",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <h2>User Form</h2>
        <form
          onSubmit={handleUserInfo}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Upload Image */}
            <div>
              <UploadImage onUpload={(url) => setImageUrl(url)} maxSizeMB={2} />
             
            </div>
          </div>

          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            ref={Enter(0)}
            type="text"
            name="name"
            placeholder="Name"
            onKeyDown={(e) => handleEnter(e, 0)}
            required
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Phone */}
          <label htmlFor="phone">Phone Number</label>
          <input
            ref={Enter(1)}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onKeyDown={(e) => handleEnter(e, 1)}
            required
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            ref={Enter(2)}
            type="email"
            name="email"
            placeholder="Email"
            onKeyDown={(e) => handleEnter(e, 2)}
            required
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Gender */}
          <label htmlFor="gender">Gender</label>
          <select
            ref={Enter(3)}
            name="gender"
            onKeyDown={(e) => handleEnter(e, 3)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Address */}
          <label htmlFor="address">Address</label>
          <textarea
            ref={Enter(4)}
            name="address"
            placeholder="Address"
            rows={3}
            onKeyDown={(e) => handleEnter(e, 4)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Description */}
          <label htmlFor="description">Description</label>
          <textarea
            ref={Enter(5)}
            name="description"
            placeholder="Description"
            rows={3}
            onKeyDown={(e) => handleEnter(e, 5)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Company */}
          <label htmlFor="company">Company</label>
          <input
            ref={Enter(6)}
            type="text"
            name="company"
            placeholder="Company"
            onKeyDown={(e) => handleEnter(e, 6)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Position */}
          <label htmlFor="position">Position</label>
          <input
            ref={Enter(7)}
            type="text"
            name="position"
            placeholder="Position"
            onKeyDown={(e) => handleEnter(e, 7)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Department */}
          <label htmlFor="department">Department</label>
          <input
            ref={Enter(8)}
            type="text"
            name="department"
            placeholder="Department"
            onKeyDown={(e) => handleEnter(e, 8)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Submit */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#4CAF50",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}