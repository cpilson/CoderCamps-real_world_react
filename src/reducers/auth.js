export default (state = {}, action) => {
  // We should be able to assign the username, email, token into state by calling our auth dispatcher/etc out in login.js
  // This is the auth reducer
  switch (action.type) {
    case "LOGIN":
      // debugger;
      // JWT WILL RETURN SOMETHING LIKE THIS:
      // {
      //   user: {
      //     username: ...,
      //     email: ...,
      //     token: ...
      //   }
      // }
      return {
        ...state,
        ...action.payload.user,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
        // Spread over the payload.user object instead of being explicit like I did below!
        // username: action.payload.user.username,
        // email: action.payload.user.email,
        // token: action.payload.user.token
      };
    case "ASYNC_START":
      if (action.subtype === "LOGIN" || action.subtype === "REGISTER") {
        return { ...state, inProgress: true };
      }
    default:
      return state;
  }
};
