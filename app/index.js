import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import App from "./containers";
import storeConf from "./storeConf.js";
import "./style/index.css";

const store = storeConf();

const renderApp = Component => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp(App);

// webpack Hot Module Replacement API
if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept("./containers", () => {
    // if you are using harmony modules ({modules:false})
    renderApp(App);
    // in all other cases - re-require App manually
    renderApp(require("./containers"));
  });
}
