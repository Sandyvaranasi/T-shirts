import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./HomePage";

export default function Tshirt() {
  const [data, setData] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState("");
  const [address, setAddress] = useState();
  const params = useParams();
  const navigate = useNavigate();

  if (order != "") {
    useEffect(() => {
      navigate(`/order/${order._id}`);
    });
  } else {
    useEffect(() => {
      api
        .get(`/product/${params.id}`)
        .then((res) => setData(res.data.data))
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    }, []);
  }

  function handleClick(e) {
    e.preventDefault();
    localStorage.getItem("token")
      ? api
          .post(
            `/order/${data._id}`,
            {
              quantity,
              address,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setOrder(res.data.data);
            console.log(quantity);
            alert("Order Generated Successfully");
          })
          .catch((err) => {
            alert(err.response.data);
            console.log(err);
          })
      : navigate("/login");
  }

  return (
    <>
      <div className="row mt-5 bg-white p-4 ">
        <div className="col">
          <img
            className="shadow lg p-3 mb-5 rounded img-fluid "
            src={data.productImage}
          />
          <div className="row">
            <h5 className="fw-bold">Select Quantity :-</h5>
            <select onClick={(e) => setQuantity(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="row">
            {" "}
            <button className="bg-success my-2" onClick={handleClick}>
              Buy Now
            </button>
          </div>
          <h5 className="mt-1">Want to gift Someone Special!!!</h5>
          <label
            for="exampleFormControlInput1"
            className="form-label fs-3 shadow p-1"
          >
            Address :-
          </label>
          <input
            type="textarea"
            className="form-control mb-2 shadow lg"
            placeholder="Street, City, Pincode"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="row">
            {" "}
            <button className="bg-info" onClick={(e) => navigate("/home")}>
              Back to Inventory
            </button>
          </div>
        </div>
        <div className="col me-9">
          <h1 className="shadow lg p-3 mb-2 bg-body-tertiary rounded fw-bold fst-italic">
            {data.productname}
          </h1>
          <h2 className="shadow lg mb-3 rounded fw-bold fst-italic">
            ₹ {data.baseprice}
          </h2>
          <h4 className="text-danger fw-bold fst-italic">
            Hurry up!!! Only {data.quantity} left in stock!!!
          </h4>
          <hr />
          <h4 className="shadow lg  mb-3 rounded fw-bold">Description :-</h4>
          <h5 className="fst-italic">{data.description}</h5>
          <h4 className="shadow lg  mb-3 rounded fw-bold">
            Available Sizes :-
          </h4>
          {data &&
            data.sizes.map((size) => (
              <span className=" badge bg-success mx-2 mb-3">{size}</span>
            ))}
          <h4 className="shadow lg  mb-3 rounded fw-bold">
            Available Colors :-
          </h4>
          {data &&
            data.colors.map((color) => (
              <span
                className=" badge mx-2 mb-3"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          <h3 className="shadow lg  mb-3 rounded fw-bold">
            Dealer's Details :-
          </h3>
          {data.shopId ? (
            <h5 className="fst-italic">
              • This T-shirt is presented by {data.shopId.shop}
              <br />• This is a trusted shop and is working with Tee-Shirts
              Since {data.shopId.createdAt}
              <br />
              The Owner Mr/Mrs {data.shopId.ownername} is serving for the well
              being and livlihood of many <br />
              orphans through the earnings of their trade from the shop location{" "}
              {data.shopId.street} street,
              <br />
              {data.shopId.city} city, {data.shopId.pincode}.
            </h5>
          ) : (
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
