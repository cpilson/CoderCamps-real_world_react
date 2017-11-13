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
    <div>
      {props.articles.map(article => {
        return <h2>{article.title}</h2>;
      })}
    </div>
  );
};

export default ArticleList;
