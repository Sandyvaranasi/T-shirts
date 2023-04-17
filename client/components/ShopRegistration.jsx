import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../src/App";
import { api } from "./HomePage";

export default function ShopRegistration() {
  const { isLoggedIn, isVendorLoggedIn } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownername, setOwnerName] = useState("");
  const [shop, setShop] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const navigate = useNavigate();

  function submitHandler() {
    api
      .post("/shop", {
        email,
        password,
        ownername,
        shop,
        phone,
        street,
        city,
        pincode,
        landmark,
      })
      .then(() => {
        alert("registration Successful !!!");
        navigate("/vendorLogin");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
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
    <div className="col mt-5 text-white">
      <p>Shop Registration Page</p>
      <h1>Signup here </h1>
      <hr />
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label fs-4">
          Owner's Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your name here..."
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label fs-4">
          Shop's Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Name of Shop here..."
          onChange={(e) => setShop(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label fs-4">
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
        <label for="exampleFormControlInput1" className="form-label fs-4">
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
      <label for="inputPassword5" className="form-label fs-4">
        Password
      </label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-labelledby="passwordHelpBlock"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text bg-dark text-white">
        Your password must be 8-15 characters long, contain letters, special
        characters and numbers, and must not contain spaces, or emoji.
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label fs-4">
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
        <label for="exampleFormControlInput1" className="form-label fs-4">
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
        <label for="exampleFormControlInput1" className="form-label fs-4">
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
        <label for="exampleFormControlInput1" className="form-label fs-4">
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
        <Link to="/vendorLogin">Already registered?? LogIn Now!!!</Link>
      </div>
    </div>
  );
}
