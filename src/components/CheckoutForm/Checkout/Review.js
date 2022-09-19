import React from "react";

function Review({ checkoutToken }) {
  return (
    <div>
      <h3>Order of summary</h3>
      {checkoutToken.live.line_items.map((product) => {
        return (
          <div key={product.product_id} className="summary--div">
            <div className="name--quantity">
              <h5>{product.name}</h5>
              <p>Quantity: {product.quantity}</p>
            </div>
            <div className="price">
              <p>{product.line_total.formatted_with_symbol}</p>
            </div>
          </div>
        );
      })}
      <div className="subtotal">
        <h3>Total</h3>
        <h5>{checkoutToken.live.subtotal.formatted_with_symbol}</h5>
      </div>
    </div>
  );
}

export default Review;
