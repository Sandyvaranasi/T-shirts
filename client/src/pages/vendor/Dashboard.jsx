import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <div className="row">
        <Link to={"create"} className="col btn btn-light border m-1">
          Create
        </Link>
        <Link to={"orders"} className="col btn btn-light border m-1">
          Orders
        </Link>
      </div>

      <hr />

      <Outlet />
    </div>
  );
}
