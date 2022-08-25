import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="header--searchfield">
        <input type="text" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <h4 className="header--login__link">Login</h4>
      <div className="header--cart">
        <i className="fa-solid fa-cart-arrow-down"></i>
        <p>Cart</p>
      </div>
    </header>
  );
}

export default Header;
