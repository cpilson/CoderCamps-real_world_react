import {
  PROFILE_PAGE_LOADED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_UNLOADED,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload[0].profile,
      };
    case FOLLOW_USER:
      return {
        ...action.payload.profile,
      };
    case UNFOLLOW_USER:
      return {
        ...action.payload.profile,
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
