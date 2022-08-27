import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import commerce from "../lib/commerce";

function Header() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    const { data } = await commerce.categories.list();
    setCategories(data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <header className="header">
      <Logo />
      <div className="header--searchfield">
        <select>
          <option>All</option>
          {categories.map(({ name }) => {
            return <option key={name}>{name}</option>;
          })}
        </select>
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
