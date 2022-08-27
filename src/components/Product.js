import React from "react";

function Product({ url, name, description, price, category }) {
  return (
    <div className="product">
      <img src={url} />
      <h4 className="category">{category}</h4>
      <h4 className="name">{name}</h4>
      <h5 className="description--label">Description</h5>
      <p className="description">{description}</p>
      <div className="product--price__div">
        <p className="price">{price}</p>
        <button className="add--to--cart">Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
