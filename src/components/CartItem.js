import React, { memo } from "react";

function CartItem({
  imageUrl,
  name,
  price,
  quantity,
  itemTotal,
  removeItemFromCart,
  productId,
  updateCartItem,
}) {
  return (
    <div className="cart--item">
      <div className="cart--image__div">
        <img src={imageUrl} />
      </div>
      <p className="item--name">{name}</p>
      <div className="price--quantity">
        <p>{price}</p>
        <div className="quantity--edit">
          <button
            onClick={() => {
              updateCartItem(productId, quantity - 1);
            }}
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              updateCartItem(productId, quantity + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="remove--btn__div">
        <p>
          Total: <span className="item--total">{itemTotal}</span>
        </p>
        <button
          className="remove--btn"
          onClick={() => {
            removeItemFromCart(productId);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default memo(CartItem);
