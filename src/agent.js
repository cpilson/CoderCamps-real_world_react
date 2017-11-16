import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import JWT from "superagent-jwt";
// Underscores in JS say that the developer is signalling that this is a "private" variable--that it was only meant to exist HERE, in its own file/scope.
// It is a convention rather than anything in the language itself.

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://codercamps-conduit.herokuapp.com/api";

const jwt = JWT({
  header: "Authorization", // This comes out of our JSON payload inspection. Header name to try reading JWT from responses, default to 'jwt'
  local: "jwt" // key to store the JWT in localStorage, default to "jwt"
});

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(jwt)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(jwt)
      .then(responseBody)
};

const Articles = {
  all: page => requests.get(`/articles?limit=10`)
};

const Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post(`/users/login`, { user: { email, password } })
};

export default {
  Articles,
  Auth
};
