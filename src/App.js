import React from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import { useState, useEffect } from "react";
import commerce from "./lib/commerce";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <Header />
      <main className="main">
        <Carousel />
        {isLoading && <i className="fa-solid fa-spinner"></i>}
        {!isLoading && <Products products={products} />}
      </main>
    </>
  );
}

export default App;
