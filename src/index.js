import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
// v2.8.1 React Router.
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import App from "./components/App";
import Article from "./components/Article";
import Editor from "./components/Editor";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Settings from "./components/Settings";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="article/:id" component={Article} />
        <Route path="editor" component={Editor} />
        <Route path="editor/:slug" component={Editor} />
        <Route path="/login" component={Login} />
        <Route path="@:username" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
