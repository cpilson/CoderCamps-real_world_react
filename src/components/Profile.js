import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import ListErrors from "./ListErrors";
import agent from "../agent";

// {
//     "profile": {
//         "username": "jake",
//         "bio": "I work at statefarm",
//         "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
//         "following": false
//     }
// }

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({
      type: "FOLLOW_USER",
      payload: agent.Profile.follow(username)
    }),
  onLoad: payload => dispatch({ type: "PROFILE_PAGE_LOADED", payload }),
  onUnfollow: username =>
    dispatch({
      type: "UNFOLLOW_USER",
      payload: agent.Profile.unfollow(username)
    }),
  onUnload: () => dispatch({ type: "PROFILE_PAGE_UNLOADED" })
});

const FollowButton = props => {
  // If this view comes by way of the profile owner, do nothing:
  if (props.profileOwner || !props.loggedIn) {
    return null;
  }

  const handleFollowClick = e => {
    e.preventDefault();
    if (props.profile.following) {
      // send an onUnfollow dispatch.
      props.unfollowUser(props.profile.username);
    } else {
      // send an onFollow dispatch.
      props.followUser(props.profile.username);
    }
  };

  // Build our button.
  let followButtonClass = "btn btn-sm action-btn";
  // btn btn-sm action-btn btn-secondary|btn-outline-secondary
  if (props.profile.following) {
    followButtonClass += " btn-secondary btn-outline-danger";
  } else {
    followButtonClass += " btn-outline-secondary btn-outline-success";
  }

  let followIconAndText = { iconClassName: "", text: "" };
  if (props.profile.following) {
    followIconAndText = {
      iconClassName: "ion-minus-round",
      text: " Unfollow "
    };
    // return '<span className="glyphicon glyphicon-minus" aria-hidden="true">Unfollow</span>';
  } else {
    followIconAndText = {
      iconClassName: "ion-plus-round",
      text: " Follow "
    };
    // return '<span className="glyphicon glyphicon-plus" aria-hidden="true">Follow</span>';
  }

  return (
    <button
      id="followButton"
      className={followButtonClass}
      onClick={handleFollowClick}
      onMouseDown={e => e.preventDefault()}
    >
      <i
        className={followIconAndText.iconClassName}
        style={{ color: "black" }}
      />
      <span style={{ color: "black" }}>
        {followIconAndText.text}
        {props.profile.username}
      </span>
    </button>
  );
};

class Profile extends Component {
  // Default state:
  state = {
    username: "",
    bio: "",
    image: "https://static.productionready.io/images/smiley-cyrus.jpg",
    following: false
  };

  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.params.username)
        // agent.Articles.byAuthor(this.props.params.username)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;

    // If we're just guessing at profiles, do nothing.
    if (!profile) {
      return null;
    }

    const currentUser =
      this.props.currentUser === null ? "" : this.props.currentUser.username;
    const currentUserIsProfileOwner =
      currentUser === this.props.profile.username; // Or this.props.params.username
    const userIsLoggedIn = this.props.currentUser !== null;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <ListErrors errors={this.props.errors} />
                <img
                  src={profile.image}
                  className="user-img"
                  alt={profile.username}
                />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <FollowButton
                  loggedIn={userIsLoggedIn}
                  profileOwner={currentUserIsProfileOwner}
                  profile={profile}
                  followUser={this.props.onFollow}
                  unfollowUser={this.props.onUnfollow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
