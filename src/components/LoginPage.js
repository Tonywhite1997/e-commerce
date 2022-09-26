import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LoginPage({ setLoggedIn }) {
  const user = {
    email: "tonywhite814.tw@gmail.com",
    password: "123456",
  };

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    keepMe: false,
  });

  function handleDetailsInput({ target }) {
    setLoginDetails((prevDetails) => {
      if (target.type === "checkbox") {
        return { ...prevDetails, keepMe: !prevDetails.keepMe };
      } else {
        const { name } = target;
        return { ...prevDetails, [name]: target.value };
      }
    });
  }

  function handleLoginDetails() {
    const { email, password } = loginDetails;
    if (email !== user.email && password !== user.password) {
      return alert("Please enter correct data.");
    }
    if (email === user.email && password === user.password) {
      return setLoggedIn(true);
    }
  }

  useEffect(() => {
    const { keepMe, email, password } = loginDetails;
    if (!keepMe && localStorage.getItem("ecommerceLogin")) {
      return localStorage.removeItem("ecommerceLogin");
    }
    if (keepMe && email === user.email && password === user.password) {
      localStorage.setItem("ecommerceLogin", JSON.stringify(loginDetails));
    }
  });

  return (
    <div className="login--page">
      <h4 className="important--notice">
        To proceed to checkout, you need to be logged in first.
      </h4>
      <div className="login--page__details">
        <h4>
          To login, use "tonywhite814.tw@gmail.com" as email and "123456" as
          password.
        </h4>
      </div>
      <form className="login--page__form">
        <div className="icon--div">
          <img className="key--icon" src="../keyicon.png" />
        </div>
        <div className="input--div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginDetails.email}
            onChange={handleDetailsInput}
          />
        </div>
        <div className="input--div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginDetails.password}
            onChange={handleDetailsInput}
          />
        </div>
        <div className="keep--me__logged">
          <input
            type="checkbox"
            id="keepMe"
            checked={loginDetails.keepMe}
            onChange={handleDetailsInput}
          />
          <label htmlFor="keepMe">keep me logged in</label>
        </div>
        <Link
          to={
            loginDetails.email === user.email &&
            loginDetails.password === user.password &&
            "/"
          }
        >
          <button className="login--button" onClick={handleLoginDetails}>
            LOGIN
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
