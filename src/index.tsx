import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import /* webpackPreload: true */ "./assets/fonts/Poppins-Regular.ttf";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <div id="modal"></div>
    </BrowserRouter>
  </React.StrictMode>
);
