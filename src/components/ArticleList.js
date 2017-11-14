import React from "react";

const ArticleList = props => {
  // Fetching articles...
  if (!props.articles) {
    return <div className="article-preview">Loading...</div>;
  }

  // No articles returned...
  if (props.articles.length === 0) {
    return <div className="article-preview">No articles are here.</div>;
  }

  // Articles fetched
  return (
    <div className="article-preview">
      {props.articles.map(article => {
        return (
          <div key={article.slug}>
            <h2>{article.title}</h2>
            <span className="date">
              {new Date(article.createdAt).toDateString()}
            </span>
            <p className="blockquote">{article.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
