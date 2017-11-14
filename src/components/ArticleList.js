import React from "react";
import ArticleDetail from "./ArticleDetail";

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
        return <ArticleDetail article={article} key={article.slug} />;
      })}
    </div>
  );
};

export default ArticleList;
