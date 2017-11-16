import superagentPromise from "superagent-promise";
import _superagent from "superagent";
// Underscores in JS say that the developer is signalling that this is a "private" variable--that it was only meant to exist HERE, in its own file/scope.
// It is a convention rather than anything in the language itself.

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://codercamps-conduit.herokuapp.com/api";

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set("Authorization", `Token ${token}`);
  }
};
const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Articles = {
  all: page => requests.get(`/articles?limit=10`)
};

const Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users", { user: { username, email, password } }),
  // PUT: Update. POST: New information. PUT=="edit"
  save: user => requests.put("/user", { user })
};

export default {
  Articles,
  Auth,
  setToken: _token => {
    token = _token;
  }
};
