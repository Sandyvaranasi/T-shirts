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
      .then((res) => {
        setData(res.data.data);
        console.log(res);
      })
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
    <div className=" m-5 w-100 text-white p-4 shadow lg">
      <h1 className="fst-italic shadow lg p-2">Shop Profile </h1>
      <hr />
      <label className="fs-3 fw-bold fst-italic shadow lg">
        Owner's Name :
      </label>
      <h3 className="bg-secondary text-light shadow lg">{data.ownername}</h3>
      <label className="fs-3 fw-bold fst-italic shadow lg">Shop's Name :</label>
      <h3 className="bg-secondary text-light shadow lg">{data.shop}</h3>
      <label className="fs-3 fw-bold fst-italic shadow lg">Email Id :</label>
      <h3 className="bg-secondary text-light shadow lg">{data.email}</h3>
      <label className="fs-3 fw-bold fst-italic shadow lg">Contact No. :</label>
      <h3 className="bg-secondary text-light shadow lg">{data.phone}</h3>
      <label className="fs-3 fw-bold fst-italic shadow lg">Street :</label>
      <h3 className="bg-secondary text-light shadow lg">
        {data.street} {data.landMark}
      </h3>
      <label className="fs-3 fw-bold fst-italic shadow lg">City :</label>
      <h3 className="bg-secondary text-light shadow lg">
        {data.city}, pin : {data.pincode}
      </h3>
      <button
        className="bg-primary shadow p-2 mt-2  w-25 mx-5 shadow lg"
        onClick={handleOrders}
      >
        My products
      </button>
      <button
        className="bg-primary shadow p-2 mt-2  w-25 mx-5 shadow lg"
        onClick={handleClick}
      >
        Add product
      </button>
    </div>
  );
}
