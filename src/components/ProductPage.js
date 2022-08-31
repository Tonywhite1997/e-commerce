import React, { memo } from "react";
import Carousel from "./Carousel";
import Categories from "./Categories";
import Products from "./Products";

function ProductPage({
  navigateCategory,
  isLoading,
  falsifySorting,
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
  return (
    <main className="main">
      <Carousel />
      <Categories
        navigateCategory={navigateCategory}
        isLoading={isLoading}
        falsifySorting={falsifySorting}
      />
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
