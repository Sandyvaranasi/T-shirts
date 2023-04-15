import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./HomePage";

export default function OrderList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/order", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((err) => { navigate('/home')
        alert(err.response.data.message)});
  }, []);

  return data.length >= 1 ? (
    <div className="row mt-5 ms-5">
      <h1 className="fst-italic bg-pink p-4">Your Orders :-</h1>
      {data.map((order) => (
        <div className="col-4 p-2 mx-1 my-1 mt-2 card shadow rounded bg-white">
          <div className="row p-3 my-2">
            <h5 className="card-header text-danger">{order.status}</h5>
            <div className="card-body">
              <h5 className="card-title">{order.productId.productname}</h5>
              <p className="card-text">Order Date : {order.createdAt}</p>
              <button
                className="btn btn-primary shadow lg"
                onClick={(e) => navigate(`/order/${order._id}`)}
              >
                Get Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
