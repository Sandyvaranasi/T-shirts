import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./screens.css";

export const api = axios.create({
  // baseURL : 'https://lovely-spotty-settee.glitch.me/api'
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default function HomePage() {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const text = "Retro Inspired T-Shirts";
    const interval = setInterval(() => {
      if (index < text.length) {
        setCurrentText(text.substring(0, index + 1));
        setIndex(index + 1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [index]);
  return (
    <div className="home">
      <Link to={"/home"}>
        <button
          className="bg-primary"
          style={{
            marginLeft: "60rem",
            marginBottom: "8rem",
            marginTop: "5vh",
          }}
        >
          Explore The Store Now
        </button>
      </Link>
      <div
        className="text-white mb-5 "
        style={{ marginLeft: "15rem", fontSize: "5rem" }}
      >
        <span className="text-white fst-italic">{currentText}</span>
      </div>
    </div>
  );
}
