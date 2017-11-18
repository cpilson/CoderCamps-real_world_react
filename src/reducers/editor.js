export default (state = {}, action) => {
  switch (action.type) {
    case "ARTICLE_SUBMITTED":
      const redirectUrl = `article/${action.payload.article.slug}`;
      return { ...state, redirectTo: redirectUrl };
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
    case "EDIT_ARTICLE":
      return { ...state.article };
    default:
      return state;
  }
};
