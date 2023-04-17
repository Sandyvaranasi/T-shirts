import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./HomePage";

export default function User() {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    api
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  function handleClick() {
    navigate("/editProfile");
  }

  function handleOrders(e) {
    e.preventDefault();
    navigate("/Orders");
  }

  return (
    <>
      {data ? (
        <div className=" m-5 w-100 text-white">
          <h1 className="fst-italic shadow lg p-2">User Profile :</h1>
          <hr />
          <label className="fs-3 fw-bold fst-italic">User Name :</label>
          <h3 className="bg-secondary text-light">{data.name}</h3>
          <label className="fs-3 fw-bold fst-italic">Email Id :</label>
          <h3 className="bg-secondary text-light">{data.email}</h3>
          <label className="fs-3 fw-bold fst-italic">Contact No. :</label>
          <h3 className="bg-secondary text-light">{data.phone}</h3>
          <label className="fs-3 fw-bold fst-italic">Street :</label>
          <h3 className="bg-secondary text-light">
            {data.street} {data.landMark}
          </h3>
          <label className="fs-3 fw-bold fst-italic">City :</label>
          <h3 className="bg-secondary text-light">
            {data.city}, pin : {data.pincode}
          </h3>
          <button
            className="bg-primary shadow p-2 mt-2 w-25 mx-5"
            onClick={handleOrders}
          >
            My orders
          </button>
          <button
            className="bg-primary shadow p-2 mt-2 w-25 mx-4"
            onClick={handleClick}
          >
            Update Info
          </button>
        </div>
      ) : (
        <div className="spinner-bproduct text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
}
