import React, { useState, useEffect } from "react";
import ShippingForm from "../../CheckoutForm/ShippingForm";
import PaymentForm from "../../CheckoutForm/PaymentForm";
import commerce from "../../../lib/commerce";

function Checkout({ cart, order, handleCaptureCheckout, errorMesage }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  async function generateToken() {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (error) {}
  }

  useEffect(() => {
    generateToken();
  }, []);

  function handleNextButton() {
    setActiveStep((prevStep) => prevStep + 1);
  }
  function handleBackButton() {
    setActiveStep((prevStep) => prevStep - 1);
  }

  function handleFormSubmit(data) {
    setShippingData(data);
    handleNextButton();
  }

  console.log(shippingData);

  function Form() {
    return activeStep === 0 ? (
      <ShippingForm
        checkoutToken={checkoutToken}
        handleFormSubmit={handleFormSubmit}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={handleNextButton}
        handleBackButton={handleBackButton}
        handleCaptureCheckout={handleCaptureCheckout}
        shippingData={shippingData}
      />
    );
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
        {checkoutToken && <Form />}
      </div>
    </div>
  );
}

export default Checkout;
