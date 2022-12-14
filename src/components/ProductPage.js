import React, { memo } from "react";
import Carousel from "./Carousel";
import Categories from "./Categories";
import Products from "./Products";

function ProductPage({
  isOnline,
  navigateCategory,
  isLoading,
  isSearching,
  searchProductArray,
  searchInputRef,
  returnFromSearch,
  currentCategory,
  isSorting,
  products,
  sortArray,
  addToCart,
}) {
  if (!isOnline) {
    return (
      <main
        className="main"
        style={{
          justifyContent: "center",
          gap: ".1em",
        }}
      >
        <i
          className="fa-solid fa-triangle-exclamation"
          style={{ color: "red", fontSize: "2rem" }}
        ></i>
        <h1>Connection error!</h1>
        <p style={{ fontSize: "1.5rem" }}>
          Please check your internet connection.
        </p>
      </main>
    );
  }

  return (
    <main className="main">
      <Carousel />
      <Categories navigateCategory={navigateCategory} isLoading={isLoading} />
      {isSearching && !isLoading && (
        <h3 className="search--result__text">{`${searchProductArray.length} result(s) found for "${searchInputRef.current}" in this category`}</h3>
      )}
      {isSearching && !isLoading && (
        <button className="go--back__button" onClick={returnFromSearch}>
          Back
        </button>
      )}
      {!isLoading && (
        <p className="current--category">Category- {currentCategory}</p>
      )}
      {isLoading && <i className="fa-solid fa-spinner"></i>}
      {!isLoading && !isSearching && !isSorting && (
        <Products addToCart={addToCart} products={products} />
      )}
      {!isLoading && isSearching && !isSorting && (
        <Products addToCart={addToCart} products={searchProductArray} />
      )}
      {!isLoading && isSorting && !isSearching && (
        <Products addToCart={addToCart} products={sortArray} />
      )}
    </main>
  );
}

export default memo(ProductPage);
