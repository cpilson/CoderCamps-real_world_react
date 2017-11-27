import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { DELETE_ARTICLE } from "../../constants/actionTypes";
import agent from "../../agent";

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticleActions = props => {
  const article = props.article;

  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug));
  };

  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
          href={self.to}
        >
          <i className="ion-edit" />Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" />Delete Article
        </button>
      </span>
    );
  }

  return <span />;
};

export default connect(null, mapDispatchToProps)(ArticleActions);
