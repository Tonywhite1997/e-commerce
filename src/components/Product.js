import React, { memo } from "react";

function Product({
  url,
  name,
  description,
  price,
  category,
  addToCart,
  productId,
}) {
  return (
    <div className="product">
      <div className="image--div">
        <img alt={url} src={url} />
      </div>
      <h4 className="category">{category}</h4>
      <h4 className="name">{name}</h4>
      <h5 className="description--label">Description</h5>
      <p className="description">{description}</p>
      <div className="product--price__div">
        <p className="price">{price}</p>
        <button
          className="add--to--cart"
          onClick={() => {
            addToCart(productId, 1);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default memo(Product);
