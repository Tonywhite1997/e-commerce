import React from "react";
import reactDom from "react-dom/client";
import App from "./app";
import "../src/styles/root.css";

const ROOT = reactDom.createRoot(document.getElementById("root"));
ROOT.render(<App />);
