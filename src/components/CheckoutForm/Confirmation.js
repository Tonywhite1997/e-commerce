import React from "react";
import { Link } from "react-router-dom";

function Confirmation({ shippingData }) {
  return (
    <section
      style={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <i
        className="fa-solid fa-face-smile"
        style={{ color: "green", fontSize: "3rem" }}
      ></i>
      <p>Thank you for purchasing from us, {shippingData.firstName}. </p>
      <Link to="/">
        <button
          style={{
            padding: ".2em 1em",
            color: "white",
            backgroundColor: "green",
          }}
        >
          Continue Shopping
        </button>
      </Link>
    </section>
  );
}

export default Confirmation;
