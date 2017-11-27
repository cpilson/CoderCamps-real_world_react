import React, { Component } from "react";
import { connect } from "react-redux";

import agent from "../agent";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import Header from "./Header";

const mapStateToProps = state => ({
  appName: state.common.appName,
  redirectTo: state.common.redirectTo,
  currentUser: state.common.currentUser,
  meowMode: state.common.meowMode || false, // heh.
});

// Wrapped in () because we want to return an OBJECT, not a function.
const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class App extends Component {
  state = {};

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      //set with agent
      agent.setToken(token);
    }
    // onLoad gets a promise for the current user, or if we don't have a token, we'll set the property to null and pass it an undefined value (token).
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context is the third part: props, state, context. Context exists on a Component in React.
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    //determine URL Param isRoot?
    const appName = this.props.appName;
    return (
      <div>
        <Header
          appName={appName}
          rootURL={true}
          currentUser={this.props.currentUser}
        />
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
