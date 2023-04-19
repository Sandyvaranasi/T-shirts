import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./HomePage";

export default function Products() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("shopToken")) {
      alert("please sign in first");
      navigate("/vendorLogin");
    } else
      api
        .get("/tShirtByShop", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("shopToken")}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          console.log(res);
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
  }, []);

  return data.length >= 1 ? (
    <div className="row mt-5 ms-5">
      <h1 className="fst-italic text-white">Your Products : </h1>
      {data.map((product) => (
        <div className="col-4 p-2 mx-1 my-1 mt-2 card text-white bg-dark">
          <div className="row p-3 my-2">
            <h5 className="card-header text-danger">
              In Stock {product.quantity}
            </h5>
            <div className="card-body">
              <h3 className="card-title">{product.productname}</h3>
              <h5 className="card-title">Price ₹ {product.baseprice}</h5>
              <p className="card-text">
                Product added on : {product.createdAt}
              </p>
              <button
                className="btn btn-primary shadow lg"
                onClick={(e) => navigate(`/update/${product._id}`)}
              >
                Update Info
              </button>
              <p className="text-danger">
                Only Availability, Picture, Price, Color and Size can be
                updated.{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="spinner-bproduct text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
