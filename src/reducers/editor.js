import {
  ARTICLE_SUBMITTED,
  ASYNC_START,
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
        // redirectTo: `article/${action.payload.article.slug}`,
      };
    // return {
    //   ...state,
    //   inProgress: null,
    //   errors: action.error ? action.payload.errors : null
    // };
    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : "",
        title: action.payload ? action.payload.article.title : "",
        description: action.payload ? action.payload.article.description : "",
        body: action.payload ? action.payload.article.body : "",
        tagInput: "",
        tagList: action.payload ? action.payload.article.tagList : [],
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }

  return state;
};
