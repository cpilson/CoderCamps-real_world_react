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
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.user.token
      };
    default:
      return state;
  }
};
