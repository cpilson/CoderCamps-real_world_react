import React from "react";
import { Link } from "react-router";

const ArticlePreview = ({ article }) => {
  // const article = props.article;
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
        <Link to={`@${article.author.username}`}>
          <img src={article.author.image} role="presentation" />
        </Link>

        <div className="info">
          <Link className="author" to={`@${article.author.username}`}>
            {article.author.username}
          </Link>
          <ArticleTimeFormat />
          {/* <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span> */}
        </div>

        <div className="pull-xs-right">
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`article/${article.slug}`} className="preview-link">
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

export default ArticlePreview;
