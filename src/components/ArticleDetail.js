import React from "react";

const ArticleDetail = props => {
  const article = props.article;

  return (
    <div>
      <h2>{article.title}</h2>
      <span className="date">{new Date(article.createdAt).toDateString()}</span>
      <p className="text-lighter">{article.description}</p>
      <p className="blockquote">{article.body}</p>
    </div>
  );
};

export default ArticleDetail;
