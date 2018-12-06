import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

let storeEnhances;
if (process.env.NODE_ENV === "production") {
  storeEnhances = compose(applyMiddleware(...middlewares, sagaMiddleware));
} else {
  storeEnhances = compose(
    applyMiddleware(...middlewares, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default function storeConf(initialState = {}) {
  const store = createStore(rootReducer, initialState, storeEnhances);
  sagaMiddleware.run(rootSaga);
  if (module.hot && process.env.NODE_ENV !== "production") {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
