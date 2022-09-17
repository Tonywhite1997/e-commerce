import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import commerce from "../../lib/commerce";

function ShippingForm({ checkoutToken }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  async function fetchShippingCountries(checkoutTokenId) {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  async function fetchSubDivisions(countryCode) {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  }

  async function fetchShippingOptions(checkoutTokenId, country, region = null) {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
  }, [shippingSubDivision]);

  function handleChangeCountry(e) {
    setShippingCountry(e.target.value);
  }

  function handleChangeSubDivision(e) {
    setShippingSubDivision(e.target.value);
  }

  function handleChangeOption(e) {
    setShippingOption(e.target.value);
  }

  const countries = Object.entries(shippingCountries).map(([code, name]) => {
    return { id: code, label: name };
  });

  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => {
      return { id: code, label: name };
    }
  );

  const options = shippingOptions.map((option) => {
    return {
      id: option.id,
      label: `${option.description} - (${option.price.formatted_with_symbol})`,
    };
  });

  return (
    <form className="shipping--form">
      <div className="name--div">
        <div
          className="first-name"
          style={{ display: "flex", flexDirection: "column", gap: ".5em" }}
        >
          <label>First Name*</label>
          <input type="text" required />
        </div>
        <div
          className="last--name"
          style={{ display: "flex", flexDirection: "column", gap: ".5em" }}
        >
          <label>Last Name*</label>
          <input type="text" required />
        </div>
      </div>
      <div className="address--div__line">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Address*</label>
          <input type="text" required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Email*</label>
          <input type="email" required />
        </div>
      </div>
      <div className="city--code__div">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>City*</label>
          <input type="text" required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Zip/Postal code*</label>
          <input type="text" required />
        </div>
      </div>
      <div className="countries--div">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Shipping Country*</label>
          <select onChange={handleChangeCountry}>
            {countries.length &&
              countries.map(({ id, label }) => {
                return (
                  <option key={id} value={id}>
                    {label}
                  </option>
                );
              })}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Shipping Region*</label>
          <select
            value={shippingSubDivision}
            onChange={handleChangeSubDivision}
          >
            {subdivisions.map(({ id, label }) => {
              return (
                <option key={id} value={id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="shipping--options__div">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
          <label>Shipping Rate</label>
          <select value={shippingOption} onChange={handleChangeOption}>
            {options.map(({ id, label }) => {
              return (
                <option key={id} value={id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="button--div">
        <Link to="/cart" className="back--to--cart">
          Back to cart
        </Link>
        <button className="next--button">Next</button>
      </div>
    </form>
  );
}

export default ShippingForm;
