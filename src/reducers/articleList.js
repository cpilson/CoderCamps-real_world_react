import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      debugger;
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
    default:
      return state;
  }
};
