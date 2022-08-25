import React from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import { useEffect } from "react";

function app() {
  return (
    <>
      <Header />
      <main className="main">
        <Carousel />
      </main>
    </>
  );
}

export default app;
