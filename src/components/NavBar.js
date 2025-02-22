import React, { useState } from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {

  const host = "http://localhost:5000";


  const [userdata, setUserdata] = useState("");
  let navigate = useNavigate();
  let location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  const handleProfile = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setUserdata(json);
    navigate("/profile", { state: { userdata: json } });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">StickyBits </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item"> 
          <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')? <form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role='button' >Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role='button' >Signup</Link>
      </form> : <>
        <Link className="btn btn-primary mx-1" role='button' onClick={handleProfile} userdata={userdata} >My Profile</Link>
        <button onClick={handleLogout} className='btn btn-primary mx-1'>Logout</button>
      </>}
       
    </div>
  </div>
</nav>
  )
}
