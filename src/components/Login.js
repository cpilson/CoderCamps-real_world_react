import React from "react";
import { connect } from "react-redux";
import agent from "../agent";

// any of the properties on store auth will be spread out to props of the login component.
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: "LOGIN", payload: agent.Auth.login(email, password) })
});

class Login extends React.Component {
  state = {};

  handleInputonChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    // this.props.onLoad(agent.Articles.all());
    // onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
    this.props.onSubmit(this.state.email, this.state.password);
    console.log(`Email: ${this.state.email} Password: ${this.state.password}`);
    // this.props.onSubmit(agent.Auth.login(this.props.email, this.props.password));
    // demo_22@codercamps.com testing001
  };

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a>Need an account?</a>
              </p>

              <form onSubmit={this.handleOnSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      onChange={this.handleInputonChange}
                      className="form-control form-control-lg"
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      onChange={this.handleInputonChange}
                      className="form-control form-control-lg"
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
