import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
} from "../constants/actionTypes";
import agent from "../agent";

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug),
    }),
  unfavorite: slug =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug),
    }),
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited
    ? "btn btn-sm btn-success"
    : "btn btn-sm btn-outline-primary btn-outline-success";

  const handleClick = e => {
    e.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  // Setting up our Article time format text:
  const ArticleTimeFormat = () => {
    if (article.updatedAt === article.createdAt) {
      // A new article; one that hasn't been edited.
      return (
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      );
    } else {
      var cDate = new Date(article.createdAt).toDateString();
      var cTime = new Date(article.createdAt).toTimeString();
      var uDate = new Date(article.updatedAt).toDateString();
      var uTime = new Date(article.updatedAt).toTimeString();
      return (
        <span
          className="date"
          style={{ color: "red" }}
          title={`Edited: ${uDate} ${uTime}`}
        >
          {`${cDate} ${cTime}`}
        </span>
      );
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`@${article.author.username}`} href={self.to}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link
            className="author"
            to={`@${article.author.username}`}
            href={self.to}
          >
            {article.author.username}
          </Link>
          <ArticleTimeFormat />
        </div>

        <div className="pull-xs-right">
          <button
            className={favoriteButtonClass}
            onClick={event => handleClick(event)}
          >
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link
        to={`article/${article.slug}`}
        href={self.to}
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-last">
          {article.tagList.map(tag => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
