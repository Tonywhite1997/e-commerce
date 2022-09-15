import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage({ setLoggedIn, loggedIn }) {
  const user = {
    email: "tonywhite814.tw@gmail.com",
    password: "123456",
  };

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [keepMe, setKeepMe] = useState(false);

  function handleDetailsInput({ target }) {
    const { name } = target;
    setLoginDetails((prevInput) => {
      return {
        ...prevInput,
        [name]: target.value,
      };
    });
  }

  function handleLoginDetails(e) {
    e.preventDefault();
    const { email, password } = loginDetails;
    if (email === user.email && password === user.password) {
      return setLoggedIn(true);
    }
  }
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
      <form className="login--page__form" onClick={handleLoginDetails}>
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
            checked={keepMe}
            onChange={() => {
              setKeepMe((prevState) => !prevState);
            }}
          />
          <label>keep me logged in</label>
        </div>
        <Link
          to={
            loginDetails.email === user.email &&
            loginDetails.password === user.password &&
            "/"
          }
        >
          <button className="login--button">LOGIN</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
