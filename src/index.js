import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// import { BrowserRouter } from "react-router-dom";

import "./style.css";
// import "./img/flags/flags.png";
// import "./style.css";
// import "../public/img";
import App from "./app";

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
