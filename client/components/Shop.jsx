import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./HomePage";

export default function Shop() {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    api
      .get("/shop", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("shopToken")}`,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function handleClick() {
    navigate("/addProduct");
  }

  function handleOrders(e) {
    e.preventDefault();
    navigate("/products");
  }

  return (
    <div className=" m-5 w-100 bg-white p-4">
      <h1 className="fst-italic shadow lg p-2">Shop Profile </h1>
      <hr />
      <label className="fs-3 fw-bold fst-italic">Owner's Name :</label>
      <h3 className="bg-secondary text-light">{data.ownername}</h3>
      <label className="fs-3 fw-bold fst-italic">Shop's Name :</label>
      <h3 className="bg-secondary text-light">{data.shop}</h3>
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
        className="bg-primary shadow p-2 mt-2  w-25 mx-5"
        onClick={handleOrders}
      >
        My products
      </button>
      <button
        className="bg-primary shadow p-2 mt-2  w-25 mx-5"
        onClick={handleClick}
      >
        Add product
      </button>
    </div>
  );
}
