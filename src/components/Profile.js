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

    if (!profile) {
      return null;
    }

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

                <div>
                  {profile.following ? (
                    <i className="glyphicon glyphicon-heart" />
                  ) : (
                    <i className="glyphicon glyphicon-heart-empty" />
                  )}
                </div>
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
