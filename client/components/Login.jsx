import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authContext } from "../src/App";
import { api } from "./HomePage";

export default function Login() {
  const { isLoggedIn, loggedIn, isVendorLoggedIn } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submitHandler() {
    api
      .post("/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.data.userToken);
        loggedIn(res.data.data.userToken);
        alert("Login Successful !!!");
        navigate("/user");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isLoggedIn) {
      alert("already logged in");
      navigate("/user");
    } else if (isVendorLoggedIn) {
      alert("already logged in");
      navigate("/shop");
    }
  }, []);

  return (
    <div className="col bg-white p-3 rounded-5">
      <p>Customer Sign-in Page</p>
      <h1>LogIn here </h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <label htmlFor="inputPassword5" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-labelledby="passwordHelpBlock"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text">
        Your password must be 8-15 characters long, contain letters, special
        characters and numbers, and must not contain spaces, or emoji.
      </div>
      <div className="form-group">
        <button className="bg-success mt-2 w-100" onClick={submitHandler}>
          Submit
        </button>
        <Link to="/signup">Don't have an account. Register Now!!!</Link>
      </div>
    </div>
  );
}
