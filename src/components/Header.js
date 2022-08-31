import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import commerce from "../lib/commerce";
import { Link } from "react-router-dom";

function Header({
  handleSearchCategory,
  searchQuery,
  handleSearchInput,
  performProductSearch,
  cart,
}) {
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
      <Link to="/" className="header--logo">
        <Logo />
      </Link>
      <div className="header--searchfield">
        <select onChange={handleSearchCategory}>
          <option>All</option>
          {categories.map(({ name }) => {
            return <option key={name}>{name}</option>;
          })}
        </select>
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchInput}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={performProductSearch}
        ></i>
      </div>
      <h4 className="header--login__link">Login</h4>
      <Link to="/Carts" className="header--cart">
        <i className="fa-solid fa-cart-arrow-down"></i>
        <div className="product--quantity">
          <p>{cart.line_items && cart.line_items.length}</p>
        </div>
      </Link>
    </header>
  );
}

export default Header;
