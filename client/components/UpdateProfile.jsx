import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../src/App";
import { api } from "./HomePage";

export default function UpdateProfile() {
  const { loggedOut } = useContext(authContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [landMark, setLandMark] = useState();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Login first");
      navigate("/login");
    }
  }, []);

  function updateHandler(e) {
    e.preventDefault();
    api
      .put(
        "/editInfo",
        {
          email,
          password,
          phone,
          street,
          city,
          pincode,
          landMark,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.clear();
        loggedOut();
        navigate("/login");
        alert("Update Successfull, please login again");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  }

  return (
    <div className="col mt-5 bg-white p-3 rounded-5">
      <h1>Update Form </h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
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
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
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
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Landmark
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Fill Landmark if any..."
          onChange={(e) => setLandMark(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
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
        <label htmlFor="exampleFormControlInput1" className="form-label">
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
        <button className="bg-success mt-2 w-100" onClick={updateHandler}>
          Update
        </button>
        <Link to="/user">Don't want to edit ?? Back to profile now !!!</Link>
      </div>
    </div>
  );
}
