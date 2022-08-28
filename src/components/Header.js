import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import commerce from "../lib/commerce";

function Header({
  handleSearchCategory,
  searchQuery,
  handleSearchInput,
  performProductSearch,
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
      <Logo />
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
      <div className="header--cart">
        <i className="fa-solid fa-cart-arrow-down"></i>
        <div className="product--quantity">
          <p>10</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
