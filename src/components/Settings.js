import React, { Component } from "react";
import { connect } from "react-redux";

import ListErrors from "./ListErrors";
import agent from "../agent";

const mapStateToProps = state => {
  return {
    ...state.settings,
    currentUser: state.common.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  onClickLogOut: () => dispatch({ type: "LOGOUT" }),
  onSubmitForm: user =>
    dispatch({ type: "SETTINGS_SAVED", payload: agent.Auth.save(user) })
});

class Settings extends Component {
  render() {
    return (
      <div>
        <div className="settings-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Your Settings</h1>

                <ListErrors errors={this.props.errors} />

                <hr />
                <button
                  className="btn btn-outline-danger"
                  onClick={this.props.onClickLogOut}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
