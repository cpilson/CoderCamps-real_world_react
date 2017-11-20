import React, { Component } from "react";
import { connect } from "react-redux";

import ListErrors from "../ListErrors";
import SettingsForm from "./SettingsForm";
import agent from "../../agent";

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser,
  ...state.common
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: "LOGOUT" }),
  onLoad: payload => dispatch({ type: "SETTINGS_PAGE_LOADED", payload }),
  onMeowModeToggled: meow =>
    dispatch({ type: "MEOW_MODE_TOGGLED", payload: meow }),
  onSubmitForm: user =>
    dispatch({ type: "SETTINGS_SAVED", payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: "SETTINGS_PAGE_UNLOADED" })
});

class Settings extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    console.log(`MeowMode: ${this.props.meowMode}`);

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors} />
              <SettingsForm
                currentUser={this.props.currentUser}
                meowMode={this.props.meowMode}
                onMeowModeToggled={this.props.onMeowModeToggled}
                onSubmitForm={this.props.onSubmitForm}
              />
              <hr />

              <button
                className="btn btn-outline-danger btn-block"
                onClick={this.props.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
