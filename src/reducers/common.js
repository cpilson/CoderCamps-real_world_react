import {
  APP_LOAD,
  REDIRECT,
  LOGIN,
  LOGOUT,
  REGISTER,
  SETTINGS_SAVED,
  ARTICLE_SUBMITTED,
  DELETE_ARTICLE,
  MEOW_MODE_TOGGLED,
} from "../constants/actionTypes";

const defaultState = {
  appName: "Meowdium",
  articles: null,
  token: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        currentUser: action.payload ? action.payload.user : null,
        meowMode: false,
        appLoaded: true,
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return {
        ...state,
        redirectTo: "/",
        token: null,
        currentUser: null,
      };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
      };
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
      };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        currentUser: action.error ? null : action.payload.user,
      };
    case ARTICLE_SUBMITTED:
      return { ...state, redirectTo: `article/${action.payload.article.slug}` };
    case DELETE_ARTICLE:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
      };
    case MEOW_MODE_TOGGLED:
      return {
        ...state,
        meowMode: action.payload,
      };
    default:
      return state;
  }
};
