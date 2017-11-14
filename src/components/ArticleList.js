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
      {props.articles.map(article => {
        return <ArticlePreview article={article} key={article.slug} />;
      })}
    </div>
  );
};

export default ArticleList;
