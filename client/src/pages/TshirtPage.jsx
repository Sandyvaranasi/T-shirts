import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../App";

export default function TshirtPage() {
  const params = useParams();

  const { addToCart } = useContext(CartContext);

  const [tShirt, setTShirt] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/t-shirts/${params.id}`, {
        headers: {
          Authorization: "",
        },
      })
      .then((response) => {
        const t = response.data.data;
        setTShirt(t);
      });
  }, [params.id]);

  if (!tShirt) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <img className="img-fluid rounded" src={tShirt.productImage} alt="" />
        </div>
        <div className="col">
          <h1>{tShirt.productname}</h1>
          <p>{tShirt.description}</p>

          <hr />

          <h5>₹ {tShirt.baseprice}</h5>

          <div>
            <span>Available Sizes</span>
            <br />
            {tShirt.sizes.map((s) => (
              <span className="badge bg-success mx-1">{s}</span>
            ))}
          </div>
          <hr />
          <div>
            <span>Available Colors</span>
            <br />
            {tShirt.colors.map((s) => (
              <span
                className="badge mx-1"
                style={{
                  backgroundColor: s,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <hr />

          <button
            onClick={() => addToCart(tShirt)}
            className="btn btn-warning m-2"
          >
            Add to cart
          </button>
          <button className="btn btn-success">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
