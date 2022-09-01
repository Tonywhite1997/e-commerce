import React, { useEffect, useState } from "react";
import commerce from "../lib/commerce";

export default function Categories({ navigateCategory }) {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    const { data } = await commerce.categories.list();
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="main--categories__link">
      <h3>Categories</h3>
      <ul className="category--container">
        {categories.map((category) => {
          return (
            <li
              name={category.name}
              key={category.name}
              onClick={() => {
                navigateCategory(category.name);
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
