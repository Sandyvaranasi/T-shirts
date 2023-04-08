import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

export default function CartPage() {
  const { cart } = useContext(CartContext);

  console.log(cart);

  if (!cart.length) {
    return (
      <div>
        <h1>No Products</h1>

        <hr />

        <Link to={"/store"}>Go To Store</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Sno.</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((p, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{p.productname}</td>
              <td>{p.baseprice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
