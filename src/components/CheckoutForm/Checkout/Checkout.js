import React, { useState } from "react";
import ShippingForm from "../../CheckoutForm/ShippingForm";
import PaymentForm from "../../CheckoutForm/PaymentForm";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  function Form() {
    return activeStep === 0 ? <ShippingForm /> : <PaymentForm />;
  }

  return (
    <div className="checkout--page">
      <div className="checkout--steps__div">
        <h2>Checkout</h2>
        <div className="address--div">
          <div className="shipping">
            <small
              style={{
                backgroundColor: "green",
              }}
            >
              {activeStep === 0 ? "1" : "✓"}
            </small>
            <p>Shipping address</p>
          </div>
          <hr />
          <div className="payment">
            <small
              style={{
                backgroundColor: activeStep === 1 ? "green" : "#232423",
              }}
            >
              2
            </small>
            <p style={{ color: activeStep === 1 ? "#232423" : "grey" }}>
              Payment details
            </p>
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
}

export default Checkout;
