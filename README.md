# Branch 00 (`master`) Status & Badges

| Build Status                                                                                                                                          |                                                                       [Node Security Platform](https://nodesecurity.io)                                                                       |                                                                                                                                             [Synk.io](https://synk.io) |                                                                                                                                      [Code Maintainability](https://codeclimate.com) |                                                                                                                                       [Test Coverage](https://codeclimate.com) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Build Status](https://travis-ci.org/cpilson/CoderCamps-real_world_react.svg?branch=00)](https://travis-ci.org/cpilson/CoderCamps-real_world_react) | [![NSP Status](https://nodesecurity.io/orgs/cpilson/projects/8fdc12bf-900c-4063-9fc7-7b1381d4e3de/badge)](https://nodesecurity.io/orgs/cpilson/projects/8fdc12bf-900c-4063-9fc7-7b1381d4e3de) | [![Known Vulnerabilities](https://snyk.io/test/github/cpilson/codercamps-real_world_react/badge.svg)](https://snyk.io/test/github/cpilson/codercamps-real_world_react) | [![Maintainability](https://api.codeclimate.com/v1/badges/06de6980cf2430b4e59f/maintainability)](https://codeclimate.com/github/cpilson/CoderCamps-real_world_react/maintainability) | [![Test Coverage](https://api.codeclimate.com/v1/badges/06de6980cf2430b4e59f/test_coverage)](https://codeclimate.com/github/cpilson/CoderCamps-real_world_react/test_coverage) |

[![React + Redux Example App](project-logo.png)](#react--redux-example-appproject-logopng)

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

<!-- TOC -->

* [Part 01](#part-01)
* [Part 02](#part-02)
* [Part 03](#part-03)
* [Part 04](#part-04)
* [Part 05](#part-05)
* [Part 06](#part-06)
* [Part 07](#part-07)
* [Part 08](#part-08)
* [Part 09](#part-09)
* [Part 10](#part-10)
* [Part 11](#part-11)
* [Part 12](#part-12)
* [Part 13](#part-13)
* [Part 14](#part-14)
* [Part 15](#part-15)
* [Part 16](#part-16)
* [Part 16a](#part-16a)
* [Part 17](#part-17)
* [Part 18](#part-18)
* [Part 19](#part-19)
* [Part 20](#part-20)
* [Part 20a](#part-20a)
* [Feature: Profile View](#feature-profile_view)
* [Feature: Meow Mode](#feature-meowmode)
* [Feature: Meow Mode Slider Switch](#feature-meow-mode-slider-switch)
* [Feature: User ~~Lurking~~ Following](#feature-follow-user)
* [Feature: ArticleList Enhancement](#feature-articlelist-enhancement)
* [Part 22](#part-22)
* [Security Hotfix](#security-hotfix)
* [Code Conformity & Testing Hotfix](#code-conformity--testing-hotfix)

<!-- /TOC -->

# Example React + Redux codebase that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API

# Redux codebase containing real world examples (CRUD, auth, advanced patterns, etc)

Originally created for this
[GH issue](https://github.com/reactjs/redux/issues/1353). The codebase is now
feature complete and the RFC is open. --Your input is greatly appreciated;
please submit bug fixes via pull requests & feedback via issues--.

We're currently working on some docs for the codebase (explaining where
functionality is located, how it works, etc) but most things should be self
explanatory if you have a minimal understanding of React/Redux.

## Getting started

You can view a live demo over at <https://react-redux.realworld.io/>

To get the frontend running locally:

* Clone this repo
* `npm install` to install all req'd dependencies
* `npm run watch` to have webpack bundle the JS files into /bin/main.js, then
  run `npm start`

For convenience, we have a live API server running at
<https://conduit.productionready.io/api> for the application to make requests
against. You can view
[the API spec here](https://github.com/GoThinkster/productionready/blob/master/API.md)
which contains all routes & responses for the server. We'll release the backend
code in a few weeks should anyone be interested in it.

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone)
called "Conduit". It uses a custom API for all requests, including
authentication. You can view a live demo over at
<https://redux.productionready.io/>

--General functionality:--

* Authenticate users via JWT (login/signup pages + logout button on settings
  page)
* CRU- users (sign up & settings page - no deleting required)
* CRUD Articles
* CR-D Comments on articles (no updating required)
* GET and display paginated lists of articles
* Favorite articles
* Follow other users

--The general page breakdown looks like this:--

* Home page (URL: /#/ )
  * List of tags
  * List of articles pulled from either Feed, Global, or by Tag
  * Pagination for list of articles
* Sign in/Sign up pages (URL: /#/login, /#/register )
  * Use JWT (store the token in localStorage)
* Settings page (URL: /#/settings )
* Editor page to create/edit articles (URL: /#/editor,
  /#/editor/article-slug-here )
* Article page (URL: /#/article/article-slug-here )
  * Delete article button (only shown to article's author)
  * Render markdown from server client side
  * Comments section at bottom of page
  * Delete comment button (only shown to comment's author)
* Profile page (URL: /#/@username, /#/@username/favorites )
  * Show basic user info
  * List of articles populated from author's created articles or author's
    favorited articles

---

## Part 01

* Wire up redux in the index.js
* Set App Name as Props with mapStateToProps
* You should now see the app name displayed in your browser!

## Part 02

* CSS is imported via a `link` tag; check the `index.html` file for details.
* Created Features `Home` and `Header` Components.
* Home has:
  * `index`
  * `MainView` that will have your global feed and popular tags
  * `Banner`

## Part 03

* Create our `ArticleList` Component
  * ~~2~~ 3 scenarios:
    * We either have articles (fetched from the server) and haven't received
      them;
    * We have articles and they're availalbe;
    * We have no articles at all.
* Fetch some articles, from `https://codercamps-conduit.herokuapp.com/api`
  * Using superAgent ot create Articles
  * We'll be able to append a lot of other http requests to our agent as we move
    along.

## Part 04

* Created a `middleware.js` to handle the Promise with promiseMiddleware. This
  will be a collection of functions that will run when we dispatch actions.
* Rendered our article(s) and created a "dumb" component that receives props
  from `ArticlesList`, called `ArticleDetail`.

## Part 05

* Now that we have a dispatch to reducers working, with a switch statement
  catching on action type `HOME_PAGE_LOADED`, we:
  * Created and built out the `ArticlePreview` component;
  * Added the `ArticlePreview` component in the `ArticleList` component.

## Part 06

* Refactoring:
  * Made room for routing.
  * Removed all store stuff from `index.js` and put it in a new
    file--`store.js`.
* Added some basic routing

## Part 07

* Create the Login component
* Create a link to the login page in the Header component

## Part 08

* Created the reducers directory and refactored out the global feed reducer
* Common reducer
* `auth.js` reducer file
* Added `combineReducer`

## Part 09

* Create a `ListErrors` Component that will take errors as a prop, and renders
  an unordered list.
* Errors _should_ be an array of objects.
* Also, if the state says there's an auth request in progress, we'll disable the
  submit button.
* `ASYNC_START` what will trigger a conditional in it's respective store
  propterty to let us know when an async http request is in progress

## Part 10

* Some redirects on login; goes to `/`
* Added additional action to the common reducer,
* Learned about `componentWillReceiveProps` as a lifecycle method.
* Wire up dispatch to `REDIRECT` to stop the router from constantly redirecting
* Note to us, react router v4 using a component
  [v4](https://reacttraining.com/react-router/web/example/auth-workflow)

## Part 11

* `npm install superagent-jwt` to leverage this to fetch and append the JWT from
  localStorage on http requests.
* Local storage as a middleware, what is local middleware?
* Set up localStorage to capture the JWT (JSON Web Token).
* All GET/POST requests (in `agent`) now pull the JWT from localStorage and
  append correctly to the header.
* Ran reducer `APP_LOAD` to "rehydrate" our Redux store and make the
  `currentUser` request.

## Part 12

* Accessing & displaying Authentication Status
* Update the Header component
* pass currentUser to it via props
* We'll need Postman to test the API endpoints with. Check it out
  [HERE](https://www.getpostman.com/)

## Part 13

* Register users.
* agent post auth register
* Added auth reducer to handle `REGISTER` a lot like `LOGIN`
* Added code in `common` reducer to redirect and capture `currentUser`
* Now let's make a user

## Part 14

* Created `Settings` component with `settings` reducer, also updated `store`.
* http `PUT` method for `/user` to save user data.
* Click to logout action that will remove `currentUser` and redirect.
* Still need to reset `localStorage`, as the current behavior is a post-logout
  refresh will log the user back in.

## Part 15

* Made a `SettingsForm` that takes a `currentUser` and an `onSubmitForm` as
  props.
* Dealt with lifecycles for `componentWillMount()` and
  `componentWillReceiveProps()`.
* Merged an `Object` in `componentWillMount()` before a render, learned that
  `setState()` won't work.

## Part 16

* Remove JWT from localstorage on logout.

## Part 16a

* Added `{Link}` to `Login` to facilitate routing to `Register`
* Added `Animate CSS` to `public HTML` file (CDN link) to permit shake effect on
  `ListErrors` items
* Added helper function `clearErrors()` to `Login`|`Registration` that clears
  out `auth` state `errors`; used on `Login`|`Registration` submit button click,
  and called when the `Login`|`Registration` `componentWillUnmount()`.
  * _So what?_ This presents the user with a new alert/animation should they go
    to log in again, AND prevents moving back to the `Login`|`Registration`
    forms and being given an immediate error from a previous uncorrected `Login`
    or `Registration` submission.

## Part 17

* We're going to go back to `ArticlePreview` and adding `Link` tags versus `a
  to=` calls.
* We're going to add http methods to get a single article and its comments based
  on the slug.
* `Promise.all()`: used to consume multiple promises. If they all resolve, we'll
  get an array of their returns. Read about that
  [HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
* Article is now a Feature Component (a folder in Components) to display whole
  article.
* Use of
  [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).
* Use of marked:

  ```js
  /* marked is a library that compiles markdown into HTML - in order to get react to render raw HTML, we need to use this dangerouslySetInnerHTML property, because React sanitizes HTML by default. */
  {
    __html: marked(article.body);
  }
  ```

## Part 18

* The great cleanup. We address several of the "warnings" that have been adding
  up over the course of our project. We should just be left with 2 - these we'll
  leave for now.
* Cleaned up console log outputs to a respectable state.

  `lowPriorityWarning.js:38 Warning: Accessing PropTypes via the main React
  package is deprecated, and will be removed in React v16.0. Use the latest
  available v15.- prop-types package from npm instead. For info on usage,
  compatibility, migration and more, see https://fb.me/prop-types-docs`

## Part 19

* `Article` Actions for deleting article with agent `del`
* `Article` metadata. showing the author and created date, allowing the
  `canBeModified` property if true, the author can delete.
* A reducer for `"DELETE_ARTICLE"` that redirects to "/"

## Part 20

* Added an `Editor` for the `Article`s.
* Added an agent for the `Editor`.

  ```js
  create: article => requests.post("/articles", { article });
  ```

* Created an Editor component that will be our form for posting new `Article`s.
* We've got a lot of markdown render, really just boils down to fields on change
  `title`, `description`, `body`, `tagList`, `tag`
* We can dynamically add tags to our article.
* Methods `handleInputChange`, `handleTagChange`, `submitForm`, `removeTag`
* Now we need a reducer to handle the --"ARTICLE_SUBMITTED":-- in both our
  editor reducer and in our common reducer for redirect.

  ```js
  case "ARTICLE_SUBMITTED":
  const redirectUrl = `article/${action.payload.article.slug}`;
  return { ...state, redirectTo: redirectUrl };
  ```

* We are now able to edit an article that we have previously published.

## Part 20a

* FILESTACK SUPPORT for picking a profile image.
  * Awwww, yiss.
* README file cleanup. (Also an "awww, yiss" moment.)

## Feature: **Profile View**

* Adding a way to connect with the `/api/profiles/:username` endpoint (via a
  `Route` to `/profiles/@username`) and show these on a `Profile` page.
* Also added an `unLoad` function to the local `Profile` component, which hooks
  the `profile` reducer and clears `state.profile`.
* Burned about 45 minutes trying to figure out _why_ `profile` wasn't coming
  through the store, even though I was quite sure I had hooked it up properly.
  ... Then I looked at `store.js` and realized I'd never put the `profile`
  reducer into the global `combineReducers` call. Oopsies.
* Cosmetic fix of the header/banner. Because, gross.

## Feature: **Meow Mode**

* `Meow Mode` introduced!
* Good luck.
* If you want to see this working right meow, head to `Settings` and toggle
  `meowMode`.

## Feature: Meow Mode _Slider Switch_

* Wow. We now have a _hard-won_ slider-switch for our `meowMode` toggle.

## Feature: **Follow User**

* Correctly hooks API to `POST|DEL` from `API/profiles/USER/follow` to
  follow/unfollow other users.
* This is good.
* **Now** with 24% more _button-doesn't-seem-weird_-ness!

## Feature: ArticleList Enhancement

* Shows when an article has been updated through comparing the `createdAt` and
  `updatedAt` fields.
* Shows the `updatedAt` date and time as a tooltip on the `createdAt` date
  `<span>`.

## Part 22

* Add the ability to present and add `comments` to other people's posts. (And
  our own.)
* We are creating several Components in our `Article` folder.
  * `CommentContainer` will have serveral pieces within it:
    * A `CommentList` with `CommentInput` for new comments.
    * A `DeleteButton` component to delete a comment.
* Fixed bug in `/src/Components/Article/index.js` that would prevent an
  `Article` from being rendered when `currentUser` was `null` (e.g. no user was
  logged in).
* HOTFIX: added an additional conditional that will prevent anonymous browsers
  from following users in the user `Profile`.
* HOTFIX: Re-fixed the bug wherein a user could try to follow themselves. Now a
  user cannot follow themselves on their `Profile` page. This is so urgent that
  I'll likely roll this branch into `develop` and back into `00` (master). I
  feel close (TM) to a fix for the favoriting articles DOM bug I have created.
* Feature: Added markdown support for `Comment`s.
* Enhancement: Re-visited MeowMode. Imported
  [react-toggle-button](https://gdowens.github.io/react-toggle-button/) and
  styled `<div>`s to suit in `Settings`.
  * Removed `checkboxSlider.css`|`checkboxSlider.scss` as these are no longer
    needed.
  * Dependency `node-sass-chokidar` no longer needed, but left in project for
    possible future use.
  * Updated `GH_DOC_IMAGES/feature-meowMode_slider.png` to reflect new MeowMode
    slider. This should also update the project Wiki.

## Security Hotfix

* Removed `marked` (<https://nodesecurity.io/advisories/531>) in favor of
  [a newer fork that is being maintained](8fold-marked)
* Updated `superagent` (<https://nodesecurity.io/advisories/479>)
* Removed `node-sass-chokidar` from `package.json`. It is no longer in use, and
  presents a
  [security risk through its use of the `tunnel-agent` package](https://snyk.io/vuln/npm:tunnel-agent:20170305).
* Added [synk.io](https://synk.io) badge to `README` showing build-time
  security.

## Code Conformity & Testing Hotfix

* ~~Added [codecov](codecov.io) support to the `YAML` file (`.travis.yml`)
  looked at by `Travis-CI`.~~ Using CodeClimate is significantly easier. Easy
  code reporting is good code reporting.
* ~~Updated `.travis.yml` to reflect change to
  [CodeClimate](https://codeclimate.com) code coverage testing.~~ Still in the
  works.
* Added local `Mocha` test hooks; no unit or functional tests written yet.
* Added `ESLint` and accompanying plugins to enhance security and conformity.
* Changed `test` script in `package.json` to help Travis-CI: ~~`mocha -R spec
  --recursive './**/*.test.js'`~~ `./node_modules/mocha/bin/mocha`
* Changed `test` script in `package.json` back to `react-scripts test
  --env=jsdom` to prevent Travis-CI from failing the build.
