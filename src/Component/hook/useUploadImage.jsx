import { useState } from "react";

export function UploadImage({ onUpload, maxSizeMB = 2 }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB} MB. Please choose a smaller file.`);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
        onUpload(data.url); // pass uploaded URL
      } else {
        console.error("Upload failed:", data.error);
        alert("Upload failed, check console for details.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed, check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "1px solid #f3f4f6",
  };

  const boxStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "16px",
    objectFit: "cover",
    marginBottom: "16px",
  };

  const placeholderStyle = {
    width: "80px",
    height: "80px",
    border: "2px dashed #D1D5DB",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9CA3AF",
    marginBottom: "16px",
    textAlign: "center",
  };

  const inputStyle = {
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" style={boxStyle} />
      ) : (
        <div style={placeholderStyle}>
          {loading ? "Uploading..." : "No Image Selected"}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={inputStyle}
      />
    </div>
  );
}
