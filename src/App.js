import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>{this.props.appName}</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
