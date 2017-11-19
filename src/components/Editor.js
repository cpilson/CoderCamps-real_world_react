import React, { Component } from "react";
import { connect } from "react-redux";
import ListErrors from "./ListErrors";
import agent from "../agent";

const mapStateToProps = state => ({
  ...state.editor
});

const mapStateToDispatch = dispatch => ({
  onSubmit: payload => dispatch({ type: "ARTICLE_SUBMITTED", payload }),
  // Fire a "PAGE LOADED" event to our editor reducer:
  onLoad: payload => dispatch({ type: "EDITOR_PAGE_LOADED", payload })
});

class Editor extends Component {
  state = {
    title: "",
    description: "",
    body: "",
    tagList: [],
    tag: ""
  };

  // Is our path /editor/slugid? If so, I guess we're going out to the network to look for current article data (seems wasteful).
  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.params.slug));
    }
  }

  /**
   * React-router has an interesting quirk: if two routes have the
   * same component, react-router will reuse the component when
   * switching between the two. So if '/editor' and '/editor/slug'
   * both use the 'Editor' component, react-router won't recreate
   * the Editor component if you navigate to '/editor' from '/editor/slug'.
   * To work around this, we need the `componentWillReceiveProps()` hook.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        return this.props.onLoad(agent.Articles.get(this.props.params.slug));
      }
    }
    if (nextProps.article) {
      this.setState({
        ...nextProps.article
      });
    }
  }

  //handle input change for all form fields via the name prop
  handleInputChange = event => {
    const targetName = event.target.name;
    this.setState({
      [targetName]: event.target.value
    });
  };

  handleTagChange = event => {
    if (event.which === 13 || event.keyCode === 13) {
      this.setState({
        tagList: [...this.state.tagList, event.target.value],
        tag: ""
      });
    } else {
      this.setState({ tag: event.target.value });
    }
  };

  /* When submitting the form, we need to correctly format the
object and use the update or create calls - if we have a slug,
we're updating an article, otherwise we're creating a new
one.
*/
  submitForm = ev => {
    ev.preventDefault();
    const article = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
      tagList: this.state.tagList
    };
    // Do we have a slug? This means we're editing an existing article:
    const slug = { slug: this.props.params.slug }; // TODO: ask about this.
    const promise = this.props.params.slug
      ? agent.Articles.update(Object.assign(article, slug))
      : agent.Articles.create(article);

    this.props.onSubmit(promise); // This fires the event/create event off to the agent.
  };

  removeTag = tag => {
    this.setState({
      tagList: [...this.state.tagList.filter(t => t !== tag)]
    });
  };

  render() {
    const { title, description, body, tagList, tag } = this.state;

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="title"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.handleInputChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      name="body"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.handleInputChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="tag"
                      placeholder="Enter tags"
                      value={tag}
                      onChange={this.handleTagChange}
                      onKeyUp={this.handleTagChange}
                    />

                    <div className="tag-list">
                      {tagList.map(tag => {
                        return (
                          <span className="tag-default tag-pill" key={tag}>
                            <i
                              className="ion-close-round"
                              onClick={() => this.removeTag(tag)} // NOTE: this is called within a .map() function. THAT MEANS that we'll have to declare this as, "hey, make a function here that can do this," rather than, "do this thing," as "do this thing" will be called when .map() iterates.
                            />
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Editor);
