import React from "react";
import { Link } from "react-router";
import ArticleActions from "./ArticleActions";

const ArticleMetadata = props => {
  const article = props.article;

  return (
    <div className="article-meta">
      <Link to={`@${article.author.username}`} href={self.to}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link
          to={`@${article.author.username}`}
          href={self.to}
          className="author"
        >
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMetadata;
