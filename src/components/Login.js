import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const { showAlert } = props;

  // const host = "http://localhost:5000";
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      showAlert("Logged In Successfully", "success");
      navigate("/");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setCredentials({ email: "", password: "" }); // Reset the state manually
  };

  return (
    <>
    <div className="text-center text-light mt-2">
      <h2>Your StickyBits Journey Starts Here – Log In</h2>
    </div>
    <div className="d-flex m-3 justify-content-center align-items-center">
      <div className="card bg-dark text-info shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
      <div className="card-body">
          <h3 className="text-center mb-4">Log In</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control bg-secondary text-light border-info"
                value={credentials.email}
                onChange={onChange}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-secondary text-light border-info"
                value={credentials.password}
                onChange={onChange}
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="on"
                required
              />
            </div>
            <div className="text-center d-flex justify-content-between">
              <button type="submit" className="btn btn-info w-100 mx-2">Log In</button>
              <button className="btn btn-info w-100 mx-2" onClick={handleReset}>Clear </button>
            </div>
          </form>
        </div>
        <div className="container">
              <p className="text-light mt-3">Create Account if you dont have <Link to="/signup" className="text-primary">Signup here</Link></p>
          </div>
      </div>
    </div>
    </>

  );
};

export default Login;
