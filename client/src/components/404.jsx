import React from "react";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        height: "80vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "5rem",
      }}
    >
      <p>404</p>
      <p>Not-Found</p>
    </div>
  );
}
