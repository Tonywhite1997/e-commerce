import React, { useState, useEffect } from "react";
import ShippingForm from "../../CheckoutForm/ShippingForm";
import PaymentForm from "../../CheckoutForm/PaymentForm";
import Confirmation from "../Confirmation";
import commerce from "../../../lib/commerce";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart, handleCaptureCheckout }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const history = useNavigate();

  async function generateToken() {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (error) {
      history.pushState("/");
    }
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

  function Form() {
    if (activeStep === 0) {
      return (
        <ShippingForm
          checkoutToken={checkoutToken}
          handleFormSubmit={handleFormSubmit}
        />
      );
    } else if (activeStep === 1) {
      return (
        <PaymentForm
          checkoutToken={checkoutToken}
          nextStep={handleNextButton}
          handleBackButton={handleBackButton}
          handleCaptureCheckout={handleCaptureCheckout}
          shippingData={shippingData}
          setCart={setCart}
        />
      );
    } else {
      return <Confirmation shippingData={shippingData} />;
    }
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
                backgroundColor: activeStep !== 0 ? "green" : "#232423",
              }}
            >
              {activeStep === 2 ? "✓" : "2"}
            </small>
            <p style={{ color: activeStep !== 0 ? "#232423" : "grey" }}>
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
