import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

// {
//     "email" : "ollivanders123@gmail.com" ,
//      "password" : "Ollivanders123@"
//   }
export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cred = Object.fromEntries(formData);
    api
      .post("/vendor/login", cred)
      .then((response) => {
        const token = response.data.token;
        setError("");
        localStorage.setItem("auth-token", `Bearer ${token}`);
        navigate("/vendor/dashboard");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }
  return (
    <div>
      <div className="container col-lg-6 col-8 shadow p-4 rounded">
        <h1>Login Here</h1>
        <hr />

        {error && <p className="alert alert-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              className="form-control"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              required
              name="password"
              type="password"
              className="form-control"
            />
          </div>

          <div className="form-group mt-3">
            <input type="submit" className="form-control btn btn-success" />
          </div>
        </form>
      </div>
    </div>
  );
}
