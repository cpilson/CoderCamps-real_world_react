import React, { Component } from "react";
import ReactFilestack from "filestack-react";

// MeowMode slider toggle:
import ToggleButton from "react-toggle-button";

class SettingsForm extends Component {
  state = {
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
    meowMode: false,
  };

  componentWillMount() {
    if (this.props.currentUser) {
      const cu = this.props.currentUser;
      Object.assign(this.state, {
        image: cu.image || "",
        username: cu.username,
        bio: cu.bio,
        email: cu.email,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      const cu = nextProps.currentUser;
      this.setState(
        Object.assign(this.state, {
          image: cu.image || "",
          username: cu.username,
          bio: cu.bio,
          email: cu.email,
        }),
      );
    }
  }

  handleInputChange = event => {
    const targetName = event.target.name;
    this.setState({
      [targetName]: event.target.value,
    });
  };

  handleFilestack = response => {
    // console.log(response.filesUploaded[0].url);
    this.setState({ image: response.filesUploaded[0].url });
    // Auto-update the user object. This isn't as granular as I'd like (a PUT to the user image URL), but it's better than having to remember to click the submit button every time you change your profile image.
    this.saveUser();
  };

  meowModeToggle = val => {
    const meow = !val; //event.target.checked;
    // console.log(`MeowMode: ${meow}`);
    this.props.onMeowModeToggled(meow);
  };

  submitForm = e => {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (user.password.length <= 0) {
      delete user.password;
    }
    this.props.onSubmitForm(user);
  };

  saveUser = () => {
    const user = Object.assign({}, this.state);
    this.props.saveUser(user);
  };

  render() {
    const meowSliderBorderRadiusStyle = { borderRadius: 2 };

    return (
      <form onSubmit={e => this.submitForm(e)}>
        <fieldset>
          <fieldset className="form-group">
            <ReactFilestack
              apikey="AemY4IW2pSjuxZnrVxY1Bz" //TODO: more security.
              buttonText="Find a profile image"
              buttonClass="btn btn-info btn-block"
              options={{
                fromSources: ["local_file_system", "url", "imagesearch"],
                accept: ["image/*"],
                maxSize: 10240000,
                maxFiles: 1,
              }}
              // onSuccess={response => console.log(response)}
              onSuccess={response => this.handleFilestack(response)}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              name="bio"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.handleInputChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              name="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </fieldset>

          <fieldset>
            <fieldset className="form-group">
              <div className="row row-list">
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <ToggleButton
                    className="align-block"
                    name="meowModeSwitch"
                    thumbStyle={meowSliderBorderRadiusStyle}
                    trackStyle={meowSliderBorderRadiusStyle}
                    activeLabel="Meow"
                    value={this.props.meowMode || false}
                    onToggle={this.meowModeToggle}
                  />
                  <label htmlFor="meowModeSwitch">MeowMode</label>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  <button
                    className="btn btn-lg btn-primary btn-block pull-md-right pull-lg-right"
                    type="submit"
                    disabled={this.state.inProgress}
                  >
                    Update Settings
                  </button>
                </div>
              </div>
            </fieldset>
          </fieldset>
        </fieldset>
      </form>
    );
  }
}

export default SettingsForm;
