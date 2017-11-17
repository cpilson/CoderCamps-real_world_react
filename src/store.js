import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";

import article from "./reducers/article";
import auth from "./reducers/auth";
import common from "./reducers/common";
import editor from "./reducers/editor";
import home from "./reducers/home";
import settings from "./reducers/settings";

const reducer = combineReducers({
  article,
  auth,
  common,
  editor,
  home,
  settings
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(promiseMiddleware, localStorageMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
