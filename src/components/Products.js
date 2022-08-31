import React, { memo } from "react";
import Product from "./Product";

function Products({ products, addToCart }) {
  return (
    <div className="main--product__container">
      {products.map(({ id, image, description, name, price, categories }) => {
        return (
          <Product
            key={id}
            url={image.url}
            category={categories[0].name}
            name={name}
            addToCart={addToCart}
            productId={id}
            description={`${description
              .replaceAll("<p>", "")
              .replaceAll("</p>", "")}`}
            price={price.formatted_with_symbol}
          />
        );
      })}
    </div>
  );
}

export default memo(Products);
