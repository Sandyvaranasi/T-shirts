import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "./HomePage";

export default function Update() {
  const params = useParams();

  const [baseprice, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [colors, setColors] = useState(null);
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();

  function submitHandler() {
    const formData = new FormData();
    baseprice && formData.append("baseprice", baseprice);
    description && formData.append("description", description);
    sizes && formData.append("sizes", sizes);
    quantity && formData.append("quantity", quantity);
    colors && formData.append("colors", colors);
    productImage && formData.append("image", productImage);
    availability && formData.append("availability", availability);
    api
      .put(`/product/${params.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("shopToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("T-Shirt updated Successfully");
        navigate("/shop");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }

  return (
    <div className="col mt-5 text-white">
      <h1>Update Product Data:</h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Cost per piece here..."
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Quick description of product..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Upload Product Image
        </label>
        <input
          type="file"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Colors
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Fill colors if any..."
          onChange={(e) => setColors(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Size
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Fill sizes if any..."
          onChange={(e) => setSizes(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Quantity
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your quantity here..."
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Available
        </label>
        <button
          type="radio"
          className="form-control m-1"
          onClick={(e) => setAvailability(true)}
        >
          Yes
        </button>
        <button
          type="radio"
          className="form-control m-1"
          onClick={(e) => setAvailability(false)}
        >
          No
        </button>
      </div>
      <div className="form-group">
        <button className="bg-success mt-2 w-100" onClick={submitHandler}>
          Update Info
        </button>
        <Link to="/products">
          Do not want to update?? Return to products Now!!!
        </Link>
      </div>
    </div>
  );
}
