import React, { useEffect, useState } from "react";
import useInputSwitch from "../hook/useInputSwitch";
import { UploadImage } from "../hook/useUploadImage";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function UpDateInfo() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(data,id);
  
  const [imageUrl, setImageUrl] = useState("");

  // Initialize imageUrl with data from loader
  useEffect(() => {
    if (data && data?.image) {
      setImageUrl(data?.image);
    }
  }, [data]);

  // Set total number of inputs including future ones
  const { Enter, handleEnter } = useInputSwitch(10);

  // Form submit
  const handleUserInfo = async (e) => {
    e.preventDefault();
    console.log("Updating user data...");

    const form = e.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    const finalData = {
      ...formDataObj,
      image: imageUrl
    };

    console.log("Form Data:", finalData);

    try {
      const response = await fetch(`http://localhost:5000/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Update successful:", result);
        alert("User updated successfully!");
        navigate(-1);
      } else {
        console.error("Update failed:", response.status);
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user.");
    }
  };

  if (!data) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Loading user data...</h2>
      </div>
    );
  }

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
      {/* Left Column - User Info Preview */}
      <div
        style={{
          flex: "1",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxHeight: "80vh",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Current Information</h2>
        {data.image && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={data.image}
              alt="User"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #4CAF50",
              }}
            />
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <p><strong>ID:</strong> {data._id || data.id}</p>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Gender:</strong> {data.gender}</p>
          <p><strong>Company:</strong> {data.company}</p>
          <p><strong>Position:</strong> {data.position}</p>
          <p><strong>Department:</strong> {data.department}</p>
          <p><strong>Address:</strong> {data.address}</p>
        </div>
        
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#6c757d",
            color: "white",
            cursor: "pointer",
            width: "100%",
          }}
        >
          ← Back to List
        </button>
      </div>

      {/* Right Column - Update Form */}
      <div
        style={{
          flex: "2",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>Update User Information</h2>
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
            <div style={{ flex: 1 }}>
              <UploadImage 
                onUpload={(url) => setImageUrl(url)} 
                maxSizeMB={2}
                initialImage={data.image}
              />
              <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                {imageUrl ? "New image selected" : "No new image selected"}
              </p>
            </div>
          </div>

          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            ref={Enter(0)}
            type="text"
            name="name"
            defaultValue={data.name || ""}
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
            defaultValue={data.phone || ""}
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
            defaultValue={data.email || ""}
            placeholder="Email"
            onKeyDown={(e) => handleEnter(e, 2)}
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
            defaultValue={data.gender || ""}
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
            <option value="other">Other</option>
          </select>

          {/* Address */}
          <label htmlFor="address">Address</label>
          <textarea
            ref={Enter(4)}
            name="address"
            defaultValue={data.address || ""}
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
            defaultValue={data.description || ""}
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
            defaultValue={data.company || ""}
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
            defaultValue={data.position || ""}
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
            defaultValue={data.department || ""}
            placeholder="Department"
            onKeyDown={(e) => handleEnter(e, 8)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f8f9fa",
                color: "#333",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Cancel
            </button>
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}