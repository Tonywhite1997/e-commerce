import React from "react";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="footer">
      <h4>In partnership with </h4>
      <div className="partnership--div">
        <div className="partner">
          <i className="fa-brands fa-google"></i>
          <a href="https://google.com" target="_blank">
            <h3>Google</h3>
          </a>
        </div>
        <div className="partner">
          <i className="fa-brands fa-amazon"></i>
          <a href="https://amazon.com" target="_blank">
            <h3>Amazon</h3>
          </a>
        </div>
        <div className="partner">
          <i className="fa-solid fa-font-awesome"></i>
          <a href="https://fontawesome.com" target="_blank">
            <h3>Fontawesome</h3>
          </a>
        </div>
        <div className="partner">
          <i className="fa-solid fa-cash-register"></i>
          <a href="https://commercejs.com" target="_blank">
            <h3>CommerceJS</h3>
          </a>
        </div>
      </div>
      <small>Copyright. All rights reserved. Developed by Tony.</small>
      <div className="logo--div">
        <Logo />
      </div>
    </footer>
  );
}

export default Footer;
