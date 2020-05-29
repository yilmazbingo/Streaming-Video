import "regenerator-runtime/runtime.js";

import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css/normalize.css";
// import "./styles/styles.scss";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//compose is used to wire up the redux dev tools
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
