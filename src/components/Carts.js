import React, { memo } from "react";
import CartItem from "./CartItem";

function Carts({ cart, removeItemFromCart, emptyCart, updateCartItem }) {
  const { line_items } = cart;

  return (
    <main className="cart--page">
      <h3>Your have {cart.total_unique_items} unique item(s) </h3>
      <div className="items--container">
        {line_items &&
          line_items.map((item) => {
            return (
              <CartItem
                key={item.id}
                imageUrl={item.image.url}
                name={item.name}
                price={item.price.formatted_with_symbol}
                quantity={item.quantity}
                itemTotal={item.line_total.formatted_with_symbol}
                removeItemFromCart={removeItemFromCart}
                productId={item.id}
                updateCartItem={updateCartItem}
              />
            );
          })}
      </div>
      {line_items.length !== 0 && (
        <div className="total--price__div">
          <p>
            SubTotal:{" "}
            <span className="total--price">
              {cart.subtotal.formatted_with_symbol}
            </span>{" "}
          </p>
          <div className="button--div">
            <button onClick={emptyCart}>Empty Cart</button>
            <button>Checkout</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default memo(Carts);
