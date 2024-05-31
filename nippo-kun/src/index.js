import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store';
import MetaData from "./components/MetaData";
import Header from "./components/header";
import PDCA from "./components/pdca";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Tomorrow from "./components/tomorrow";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <MetaData />
    </Provider>,
    <PDCA />
    <Tomorrow />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
