import React from "react";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
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


  return (
    <div className="container d-flex justify-content-center">
      <div className="card text-dark bg-dark shadow-lg w-auto" style={{ borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
        <div className="card-body">
          <h3 className="card-title text-center text-info">My Profile</h3>
          <hr className="text-light" />
          {userdata ? (
            <div>
              <p className="card-text"><strong className="text-light">Name:</strong> <span style={{color: "lightblue"}}>{userdata.name}</span> </p>
              <p className="card-text"><strong className="text-light">Email:</strong>  <span style={{color: "lightblue"}}>{userdata.email}</span> </p>
              <p className="card-text"><strong className="text-light">Account Created On:</strong> <span style={{color: "lightblue"}}>{formattedDate} at {formattedTime}</span> </p>
            </div>
          ) : (
            <p className="text-danger text-center">No user data found. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}
