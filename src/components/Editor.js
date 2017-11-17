import React, { Component } from "react";
import { connect } from "react-redux";
import ListErrors from "./ListErrors";
import agent from "../agent";

const mapStateToProps = state => ({
  ...state.editor
});

const mapStateToDispatch = dispatch => ({
  onSubmit: payload => dispatch({ type: "ARTICLE_SUBMITTED", payload })
});

class Editor extends Component {
  state = {
    title: "",
    description: "",
    body: "",
    tagList: [],
    tag: ""
  };

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

  submitForm = event => {
    event.preventDefault();
    const article = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
      tagList: this.state.tagList
    };

    this.props.onSubmit(agent.Articles.create(article));
  };

  removeTag = tag => {
    // console.log(tag);
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
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.handleTagChange}
                      onKeyUp={this.handleTagChange}
                    />

                    <div className="tag-list">
                      {tagList.map(tag => {
                        return (
                          <span className="tag-default tag-pill" key={tag}>
                            <i
                              className="ion-close-round"
                              onClick={this.removeTag(tag)}
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
