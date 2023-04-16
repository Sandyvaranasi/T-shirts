import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../src/App";
import { api } from "./HomePage";

export default function Signup() {
  const { isLoggedIn, isVendorLoggedIn } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  function submitHandler() {
    api
      .post("/signup", {
        email,
        password,
        name,
        phone,
        street,
        city,
        pincode,
        landmark,
      })
      .then((res) => setData(res.data.data))
      .catch((err) => alert(err.response.data.message));
  }
  if (data != "") {
    navigate("/login");
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
    <div className="col mt-5 bg-white p-3 rounded-5">
      <h1>Signup here </h1>
      <hr />
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your name here..."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Phone No.
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your Contact number here..."
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
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
      <label for="inputPassword5" className="form-label">
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
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Street
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your Street here..."
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Landmark
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Fill Landmark if any..."
          onChange={(e) => setLandmark(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your City here..."
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Pincode
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your Pincode here..."
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="bg-success mt-2 w-100" onClick={submitHandler}>
          Submit
        </button>
        <Link to="/login">Already have an account. LogIn Now!!!</Link>
      </div>
    </div>
  );
}
