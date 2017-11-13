import superagentPromise from "superagent-promise";
import _superagent from "superagent";
// Underscores in JS say that the developer is signalling that this is a "private" variable--that it was only meant to exist HERE, in its own file/scope.
// It is a convention rather than anything in the language itself.

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://codercamps-conduit.herokuapp.com/api";

const responseBody = res => res.body;

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Articles = {
  all: page => requests.get(`/articles?limit=10`)
};

export default {
  Articles
};
