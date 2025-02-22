import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    if (!validatePassword(password)) {
      props.showAlert("Password: 8+ mix chars", "danger");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex m-3 justify-content-center align-items-center ">
      <div className="card bg-dark text-info shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control bg-secondary text-light border-info" id="name" name="name" placeholder="Enter your name" onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control bg-secondary text-light border-info" id="email" name="email" placeholder="Enter your email" onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control bg-secondary text-light border-info" id="password" name="password" placeholder="Enter your password" onChange={onChange} required autoComplete="on" />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control bg-secondary text-light border-info" id="cpassword" name="cpassword" placeholder="Confirm your password" onChange={onChange} required autoComplete="on" />
            </div>
            <div className="text-center d-flex gap-2">
              <button type="submit" className="btn btn-info w-100">Sign Up</button>
              <button type="reset" className="btn btn-info w-100">Clear</button>
            </div>
          </form>
        </div>
        <div className="container">
          <p className="text-light mt-3">Have an account? <Link to="/login" className="text-primary">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
