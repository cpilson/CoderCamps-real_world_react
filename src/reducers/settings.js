// Settings reducer

export default (state = {}, action) => {
  switch (action.type) {
    case "SETTINGS_PAGE_LOADED":
      return state;
    case "SETTINGS_SAVED":
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case "SETTINGS_PAGE_UNLOADED":
      return {};
    case "ASYNC_START":
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
};
