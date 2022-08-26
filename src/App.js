import React from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import { useState, useEffect } from "react";
import commerce from "./lib/commerce";

function App() {
  const [products, setProducts] = useState([]);
  async function fetchProcucts() {
    try {
      const productData = await commerce.products.list();
      setProducts(productData.data);
    } catch (error) {
      console.log("There was a problem fetch the products", error);
    }
  }
  useEffect(() => {
    fetchProcucts();
  }, []);
  console.log(products);
  return (
    <>
      <Header />
      <main className="main">
        <Carousel />
      </main>
    </>
  );
}

export default App;
