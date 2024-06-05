import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllCheckButton from "./components/buttons/all-check-button";
import Confirm from "./components/routes/confirm";
import Home from "./components/routes/home";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import Tomorrow from "./components/tomorrow";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Router>
      <AllCheckButton />
      <Tomorrow />
    </Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
