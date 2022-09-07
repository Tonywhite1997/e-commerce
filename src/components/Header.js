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
  loggedIn,
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
      {loggedIn ? (
        "Logout"
      ) : (
        <Link className="header--login__link" to="login">
          Login
        </Link>
      )}
      <div className="cart--container">
        <Link to="/cart" className="header--cart">
          <i className="fa-solid fa-cart-arrow-down"></i>
          <div className="product--quantity">
            <p>{cart.line_items && cart.line_items.length}</p>
          </div>
        </Link>
        <p className="cart--title">Cart</p>
      </div>
    </header>
  );
}

export default Header;
