import React from "react";

function ShippingForm() {
  return (
    <form className="shipping--form">
      <div className="name--div">
        <div
          className="first-name"
          style={{ display: "flex", flexDirection: "column", gap: ".5em" }}
        >
          <label>First Name*</label>
          <input type="text" />
        </div>
        <div
          className="last--name"
          style={{ display: "flex", flexDirection: "column", gap: ".5em" }}
        >
          <label>Last Name*</label>
          <input type="text" />
        </div>
      </div>
      <div className="address--div__line">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Address*</label>
          <input type="text" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Email*</label>
          <input type="email" />
        </div>
      </div>
      <div className="city--code__div">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>City*</label>
          <input type="text" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Zip/Postal code*</label>
          <input type="text" />
        </div>
      </div>
    </form>
  );
}

export default ShippingForm;
