import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount,
            };
          }
          return article;
        }),
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload.articles,
        articleCount: action.payload.articleCount,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
