import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../src/App";
import { api } from "./HomePage";

export default function Vendor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, vendorLoggedIn, isVendorLoggedIn } =
    useContext(authContext);

  function submitHandler() {
    api
      .post("/vendor", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("shopToken", res.data.data.shopToken);
        vendorLoggedIn(res.data.data.shopToken);
        alert("Login Successful !!!");
        navigate("/shop");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
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
    <div className="col text-white">
      <p>Vendor Sign-in Page</p>
      <h1>LogIn here </h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-3">
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
      <label htmlFor="inputPassword5" className="form-label fs-3">
        Password
      </label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-labelledby="passwordHelpBlock"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text text-white bg-dark">
        Your password must be 8-15 characters long, contain letters, special
        characters and numbers, and must not contain spaces, or emoji.
      </div>
      <div className="form-group">
        <button className="bg-success mt-2 w-100" onClick={submitHandler}>
          Submit
        </button>
        <Link to="/registerShop">Don't have an shop. Register Now!!!</Link>
      </div>
    </div>
  );
}
