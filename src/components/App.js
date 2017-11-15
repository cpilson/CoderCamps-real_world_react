import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Home from "./Home";

const mapStateToProps = state => ({
  appName: state.common.appName,
  redirectTo: state.common.redirectTo
});

// Wrapped in () because we want to return an OBJECT, not a function.
const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: "REDIRECT" })
});

class App extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context is the third part: props, state, context. Context exists on a Component in React.
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    const appName = this.props.appName;

    return (
      <div>
        <Header appName={appName} />
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
