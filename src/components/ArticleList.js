import React from "react";
import ArticlePreview from "./ArticlePreview";

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
      {props.articles.map(article => (
        <div key={article.slug}>
          <h2>{article.title}</h2>
          <ArticlePreview article={article} />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
