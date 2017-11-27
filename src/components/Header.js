import React, { Component } from "react";
import { Link } from "react-router";

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" href={self.to} className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" href={self.to} className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="register" href={self.to} className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = ({ currentUser }) => {
  if (currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" href={self.to} className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="editor" href={self.to} className="nav-link">
            <i className="ion-compose" />&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="settings" href={self.to} className="nav-link">
            <i className="ion-gear-a" />&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`@${currentUser.username}`}
            href={self.to}
            className="nav-link"
          >
            <img
              src={currentUser.image}
              className="user-pic"
              alt={currentUser.username}
            />
            {currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" href={self.to} className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
