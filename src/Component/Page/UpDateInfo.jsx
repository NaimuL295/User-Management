import React, { useRef, useState } from "react";
import useInputSwitch from "../hook/useInputSwitch";
import { UploadImage } from "../hook/useUploadImage";
import { useNavigate } from "react-router";

export default function UpDateInfo() {
    const navigation =useNavigate()
  const [imageUrl, setImageUrl] = useState("");
  const [uid, setUid] = useState(0);
  const idRef = useRef(1);

  // Set total number of inputs including future ones
  const { Enter, handleEnter } = useInputSwitch(10);

  // Auto UID
  const createID = () => {
    const useUid = idRef.current++;
    setUid(useUid);
  };

  // Form submit
  const handleUserInfo = (e) => {
    e.preventDefault();
    console.log("data");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data:", { ...data, image: imageUrl });
    e.reset()
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
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2> Users List</h2>
        <ul>{/* <Link to={$}></Link> */}</ul>
      </div>

      {/* Right Column - Form */}
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
        <h2>User Form Update</h2>
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
            {/* UID */}
            <div>
              <label htmlFor="uid">UID</label>
              <input
                type="text"
                name="uid"
                readOnly
                value={uid}
                placeholder="UID"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

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
            // defaultValue={}
          />

          {/* Address */}
          <label htmlFor="address">Address</label>
          <input
            ref={Enter(1)}
            type="text"
            name="address"
            placeholder="Address"
            onKeyDown={(e) => handleEnter(e, 1)}
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
            ref={Enter(2)}
            type="number"
            name="phone"
            placeholder="Phone Number"
            onKeyDown={(e) => handleEnter(e, 2)}
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
            ref={Enter(3)}
            type="email"
            name="email"
            placeholder="Email"
            onKeyDown={(e) => handleEnter(e, 3)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Gender */}
          <label htmlFor="gender">Gender</label>
          <select
            ref={Enter(4)}
            name="gender"
            onKeyDown={(e) => handleEnter(e, 4)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

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

          {/* Notes */}
          <label htmlFor="notes">Notes</label>
          <textarea
            ref={Enter(9)}
            name="notes"
            placeholder="Notes"
            rows={2}
            onKeyDown={(e) => handleEnter(e, 9)}
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
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button
              type="submit"
              onClick={createID}
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
              Back
            </button>
            <button
              type="submit"
              onClick={navigation("/")}
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
