import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import { useState, useEffect, useRef, memo } from "react";
import commerce from "./lib/commerce";
import Carts from "./components/Carts";
import LoginPage from "./components/LoginPage";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsBasedOnCategoryArray, setProductsBasedOnCategoryArray] =
    useState([]);
  const [searchProductArray, setSearchProductArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  // const user = {
  //   email: "tonywhite814.tw@gmail.com",
  //   password: "123456",
  // };
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);

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
      setIsLoading(false);
    }
  }

  //working on cart page

  const [cart, setCart] = useState([]);
  async function fetchCart() {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }
  async function addToCart(productId, quantity) {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }
  async function removeItemFromCart(productId) {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }
  async function updateCartItem(productId, quantity) {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }
  async function emptyCart() {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }
  useEffect(() => {
    fetchProcucts();
    fetchCart();
  }, []);

  // console.log(cart);

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

  const searchInputRef = useRef();

  function performProductSearch() {
    if (!searchQuery) {
      return;
    }
    setCurrentCategory("All");
    setIsSearching(true);
    setIsSorting(false);
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
        return product.categories.find((category) => {
          if (category.name === value) {
            return product;
          }
        });
      })
    );
  }

  // function falsifySorting() {
  //   setCurrentCategory("All");
  //   setIsSorting(false);
  //   setIsSearching(false);
  // }

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
      <Router>
        <Header
          handleSearchCategory={handleSearchCategory}
          searchQuery={searchQuery}
          handleSearchInput={handleSearchInput}
          performProductSearch={performProductSearch}
          cart={cart}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProductPage
                navigateCategory={navigateCategory}
                isLoading={isLoading}
                isSearching={isSearching}
                searchProductArray={searchProductArray}
                searchInputRef={searchInputRef}
                returnFromSearch={returnFromSearch}
                currentCategory={currentCategory}
                isSorting={isSorting}
                products={products}
                sortArray={sortArray}
                addToCart={addToCart}
              />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Carts
                cart={cart}
                removeItemFromCart={removeItemFromCart}
                emptyCart={emptyCart}
                updateCartItem={updateCartItem}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setLoggedIn={setLoggedIn} />}
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
      <div className="go--up__div" onClick={scrollToTop}>
        <div className="go--up__button">
          <a>
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default memo(App);
