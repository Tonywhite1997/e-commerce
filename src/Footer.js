import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h4>In partnership with </h4>
      <div className="partnership--div">
        <div className="partner">
          <i className="fa-brands fa-google"></i>
          <h3>Google</h3>
        </div>
        <div className="partner">
          <i className="fa-brands fa-amazon"></i>
          <h3>Amazon</h3>
        </div>
        <div className="partner">
          <i className="fa-solid fa-font-awesome"></i>
          <h3>Fontawesome</h3>
        </div>
        <div className="partner">
          <i className="fa-solid fa-cash-register"></i>
          <h3>CommerceJS</h3>
        </div>
      </div>
      <small>Copyright. All rights reserved. Developed by Tony.</small>
    </footer>
  );
}

export default Footer;
