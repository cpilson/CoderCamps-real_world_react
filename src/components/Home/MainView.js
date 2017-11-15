import React from "react";
import { connect } from "react-redux";

// Shared:
import ArticleList from "../ArticleList";

// We need to wire this to the store BECAUSE we have a list of articles.
// This is where Redux shines, as it gives us a global store. This comes in opposition to passing props down-chain from the root element.

const mapStateToProps = state => ({
  articles: state.home.articles
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a href="" className="nav-link active">
              Global Feline
            </a>
          </li>
        </ul>
      </div>
      <ArticleList articles={props.articles} />
    </div>
  );
};

export default connect(mapStateToProps)(MainView);
