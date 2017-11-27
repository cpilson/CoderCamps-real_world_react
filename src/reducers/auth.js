import {
  LOGIN,
  REGISTER,
  ASYNC_START,
  CLEAR_AUTH_ERRORS,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      return state;
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
