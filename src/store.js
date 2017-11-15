// import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { localStorageMiddleware, promiseMiddleware } from "./middleware";
import auth from "./reducers/auth";
import common from "./reducers/common";
import home from "./reducers/home";

const reducer = combineReducers({
  auth,
  common,
  home
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(localStorageMiddleware, promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
