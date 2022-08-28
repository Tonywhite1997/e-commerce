import React from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import { useState, useEffect, useRef } from "react";
import commerce from "./lib/commerce";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsBasedOnCategoryArray, setProductsBasedOnCategoryArray] =
    useState([]);
  const [searchProductArray, setSearchProductArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  function shuffleProducts(array) {
    array.sort(() => {
      return Math.floor(Math.random() - 0.5);
    });
    return array;
  }
  async function fetchProcucts() {
    setIsLoading(true);
    try {
      const { data } = await commerce.products.list();
      const newProducts = shuffleProducts(data);
      setProducts(newProducts);
      setIsLoading(false);
    } catch (error) {
      console.log("There was a problem fetch the products", error);
    }
  }
  useEffect(() => {
    fetchProcucts();
  }, []);

  const categoryRef = useRef("All");

  function handleSearchCategory({ target }) {
    categoryRef.current = target.value;
    setProductsBasedOnCategoryArray(
      products.filter(({ categories }) => {
        return categories[0].name === target.value;
      })
    );
  }

  function handleSearchInput({ target }) {
    setSearchQuery(target.value);
  }
  //   console.log(productsBasedOnCategoryArray);

  const searchInputRef = useRef();

  function performProductSearch() {
    if (!searchQuery) {
      return;
    }
    setIsSearching(true);
    // console.log(categoryRef.current);
    if (categoryRef.current !== "All") {
      setSearchProductArray(
        productsBasedOnCategoryArray.filter(({ name }) => {
          return name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    } else {
      setSearchProductArray(
        products.filter(({ name }) => {
          return name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    }
    setSearchQuery("");
    searchInputRef.current = searchQuery;
  }
  //   console.log(isSearching);
  //   console.log(searchProductArray);

  return (
    <>
      <Header
        handleSearchCategory={handleSearchCategory}
        searchQuery={searchQuery}
        handleSearchInput={handleSearchInput}
        performProductSearch={performProductSearch}
      />
      <main className="main">
        <Carousel />
        {isSearching && !isLoading && (
          <h3 className="search--result__text">{`${searchProductArray.length} result(s) found for ${searchInputRef.current} in this category`}</h3>
        )}
        {isLoading && <i className="fa-solid fa-spinner"></i>}
        {!isLoading && !isSearching && <Products products={products} />}
        {!isLoading && isSearching && (
          <Products products={searchProductArray} />
        )}
      </main>
    </>
  );
}

export default App;
