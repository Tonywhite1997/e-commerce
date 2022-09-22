import React, { useState } from "react";
import Review from "./Checkout/Review";
import commerce from "../../lib/commerce";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function PaymentForm({
  checkoutToken,
  shippingData,
  handleBackButton,
  handleCaptureCheckout,
  nextStep,
  setCart,
}) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function emptyCart() {
    const cart = await commerce.cart.delete();
    setCart(cart);
  }

  async function handleSubmit(e, elements, stripe) {
    e.preventDefault();
    if (!elements || !stripe) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } else {
      setIsError(false);
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "primary",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubDivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfilment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);
      emptyCart();
      nextStep();
    }
  }
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <hr />
      <h3 className="payment--h3">Payment method</h3>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e, elements, stripe);
              }}
            >
              <CardElement />
              <br /> <br />
              <div className="payment--card">
                <button onClick={handleBackButton}>Back</button>
                <button className="pay--button" disabled={!stripe}>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
      {isError && (
        <div
          style={{
            marginTop: "1em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".2em",
          }}
        >
          <i
            className="fa-solid fa-circle-exclamation"
            style={{ color: "red" }}
          ></i>
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
