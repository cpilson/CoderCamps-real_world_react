import agent from "./agent";

// This will happen between the dispatch and the reducer.

// Middleware has access to every action happening. Every dispatch has to come through here.
// This is why we're going to throw our LocalStorage item here.

// middleware -> dispatcher -> reducer -> store -> render()

// Dispatching promises to our reducer; this is handling the promise, waiting for it to resolve, attaching the payload back to the reducer so that we actually get data out of it.
const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: "ASYNC_START", subtype: action.type });
    action.payload.then(
      res => {
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );
    return;
  }
  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === "LOGIN" || action.type === "REGISTER") {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      // Every time we go to make an action, this will pull the token in for us:
      agent.setToken(action.payload.user.token);
    } else if (action.type === "LOGOUT") {
      window.localStorage.setItem("jwt", "");
      agent.setToken(null);
    }
  }
  // If we don't include this, the function will hang and no more actions will be processed.
  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { localStorageMiddleware, promiseMiddleware };
