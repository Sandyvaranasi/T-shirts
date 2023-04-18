import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./HomePage";

export default function Store() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [sizes, setSize] = useState("");
  const [productname, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (sizes || productname) {
      api
        .get("/product", {
          params: { productname, sizes },
        })
        .then((res) => setData(res.data.data))
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    }
  }

  useEffect(() => {
    api
      .get("/product")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function handleClick(tshirt) {
    navigate(`/tShirt/${tshirt._id}`);
  }

  return (
    <div className="row mt-5">
      <select
        className="form-control  bg-dark text-light"
        onChange={(e) =>
          e.target.value != "No value" ? setSize(e.target.value) : setSize("")
        }
      >
        <option value={"No value"}>All Size</option>
        <option value={"Small"}>Small</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Large"}>Large</option>
      </select>
      <input
        type="text"
        className="form-control  bg-lirght"
        id="exampleFormControlInput1"
        placeholder="Filter by Name "
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-primary mt-2 w-100" onClick={handleSubmit}>
        Filter
      </button>
      {data.length != 0 ? (
        data.map((tShirt) => (
          <div
            className="col-2 p-3 my-2 mx-2 bg-dark rounded-3 text-white"
            style={{ boxShadow: "3px 3px 6px rgb(96,96,96)" }}
          >
            <img
              src={tShirt.productImage}
              className="card-img-top mw-100 rounded-3"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{tShirt.productname}</h5>
              <p className="card-text">₹ {tShirt.baseprice}</p>
              <button
                className="btn btn-primary"
                onClick={(e) => handleClick(tShirt)}
              >
                More Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="spinner-bproduct text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}
