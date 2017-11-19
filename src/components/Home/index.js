import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import MainView from "./MainView";
import agent from "../../agent";

const mapStateToProps = state => ({
  appName: state.common.appName,
  meowMode: state.common.meowMode || false
});

const mapDispatchToProps = dispatch => ({
  // We've inlined this via creating an agent/HTTP Resource
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

// componentWillReceiveProps(nextProps) {
// if (nextProps.meowMode) {
//   console.log(`this.nextProps.meowMode App: ${this.nextProps.meowMode}`);
//   this.meowReplace(["h1", "h2", "p"]);
// }
// }

class Home extends Component {
  componentWillMount() {
    this.props.onLoad(agent.Articles.all());
  }

  // Let's do some post-rendering ... stuff.
  componentDidMount() {
    console.log(`this.props.meowMode index: ${this.props.meowMode}`);
    if (this.props.meowMode) {
      // this.meowReplace(["h1", "h2", "p"]);
      this.meowReplace("h1");
      this.meowReplace("h2");
      this.meowReplace("p");
    }
  }

  meowReplace = elementIDs => {
    const replacements = document.getElementsByTagName(elementIDs);
    console.log(replacements);
    for (let i = 0; i < replacements.length; i++) {
      // let wordCount = this.countWords(replacements[i].innerHTML);
      let wordCount = replacements[i].innerHTML.split(" ").length;
      var meows = "";
      while (wordCount > 0) {
        meows += "Meow. ";
        wordCount--;
      }
      replacements[i].innerHTML = meows;
      meows = "";
    }
  };

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />
        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
