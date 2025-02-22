import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const userdata = location.state?.userdata; // Retrieve userdata from navigation state

  const formattedDate = userdata?.date
    ? new Date(userdata.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const formattedTime = userdata?.date
    ? new Date(userdata.date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      })
    : "";

  // Delete Account Function
  const deleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone!");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/deleteuser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      if (json.success) {
        alert("✅ Account deleted successfully");
        localStorage.removeItem("token");
        navigate("/signup"); // Redirect to signup or login page
      } else {
        alert("❌ Error: " + json.error);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("❌ Failed to delete account. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card text-dark bg-dark shadow-lg w-auto" style={{ borderColor: "#00FF33", borderRadius: "10px", borderWidth: "2px", borderStyle: "solid" }}>
        <div className="card-body">
          <h3 className="card-title text-center text-info">My Profile</h3>
          <hr className="text-light" />
          {userdata ? (
            <div>
              <p className="card-text">
                <strong className="text-light">Name:</strong> <span style={{ color: "lightblue" }}>{userdata.name}</span>
              </p>
              <p className="card-text">
                <strong className="text-light">Email:</strong> <span style={{ color: "lightblue" }}>{userdata.email}</span>
              </p>
              <p className="card-text">
                <strong className="text-light">Account Created On:</strong> <span style={{ color: "lightblue" }}>{formattedDate} at {formattedTime}</span>
              </p>
              <button className="btn btn-danger mt-3 w-100" onClick={deleteUser}>
                🗑️ Delete Account
              </button>
            </div>
          ) : (
            <p className="text-danger text-center">No user data found. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}
