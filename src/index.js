import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router";
import { SearchProvider } from "./utils/SearchContext";
import { UserProvider } from "./utils/ContextUser";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <SearchProvider>
      <UserProvider>
        <RouterCustom />
      </UserProvider>
    </SearchProvider>
  </BrowserRouter>
);

reportWebVitals();
