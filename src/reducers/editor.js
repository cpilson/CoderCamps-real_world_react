export default (state = {}, action) => {
  switch (action.type) {
    case "ARTICLE_SUBMITTED":
      return { ...state, redirectTo: `article/${action.payload.article.slug}` };
    // return {
    //   ...state,
    //   inProgress: null,
    //   errors: action.error ? action.payload.errors : null
    // };
    case "ASYNC_START":
      if (action.subtype === "ARTICLE_SUBMITTED") {
        return { ...state, inProgress: true };
      }
      return state;
    case "EDITOR_PAGE_LOADED":
      return !action.payload
        ? state // return prior state if no payload.
        : {
            // return NEW state, consisting of the payload, if one was given.
            ...action.payload
          };
    default:
      return state;
  }
};
