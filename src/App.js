import React from "react";
import Header from "./components/Header";
import Footer from "./Footer";
import Carousel from "./components/Carousel";
import Categories from "./components/Categories";
import { useState, useEffect, useRef } from "react";
import commerce from "./lib/commerce";
import Products from "./components/Products";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    setCurrentCategory("All");
    setIsSearching(true);
    setIsSorting(false);
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

  const [isSorting, setIsSorting] = useState(false);
  const [sortArray, setSortArray] = useState([]);

  const [currentCategory, setCurrentCategory] = useState("All");

  function navigateCategory(value) {
    setCurrentCategory(value);
    setIsSearching(false);
    setIsSorting(true);
    setSortArray(
      products.filter((product) => {
        if (product.categories[0].name === value) {
          return product;
        }
      })
    );
  }

  function falsifySorting() {
    setCurrentCategory("All");
    setIsSorting(false);
    setIsSearching(false);
  }

  function returnFromSearch() {
    setIsSearching(false);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    scrollToTop();
  }, []);

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
        <Categories
          navigateCategory={navigateCategory}
          isLoading={isLoading}
          falsifySorting={falsifySorting}
        />
        {isSearching && !isLoading && (
          <h3 className="search--result__text">{`${searchProductArray.length} result(s) found for ${searchInputRef.current} in this category`}</h3>
        )}
        {isSearching && !isLoading && (
          <button className="go--back__button" onClick={returnFromSearch}>
            Back
          </button>
        )}
        {!isLoading && <p className="current--category">{currentCategory}</p>}
        {isLoading && <i className="fa-solid fa-spinner"></i>}
        {!isLoading && !isSearching && !isSorting && (
          <Products products={products} />
        )}
        {!isLoading && isSearching && !isSorting && (
          <Products products={searchProductArray} />
        )}
        {!isLoading && isSorting && !isSearching && (
          <Products products={sortArray} />
        )}
      </main>

      <div className="go--up__div" onClick={scrollToTop}>
        <div className="go--up__button">
          <a href="#">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
