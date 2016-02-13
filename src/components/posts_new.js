import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { createPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPosts(props)
      .then(() => {
        // blog post has been created, navigate to the index
        // Navigate by calling this.context.router.push with
        // new path to navigate to
        this.context.router.push('/');
      });
  }

  render() {

    // same as const title = this.props.fields.title
    const { fields: {title, categories, content}, handleSubmit } = this.props;


    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="date" className="form-control" {...categories} />
            <div className="text-help">
              {categories.touched ? categories.error : ''}
            </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
            <div className="text-help">
              {content.touched ? content.error : ''}
            </div>
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-submit">Submit</button>
            <Link to="/" className="btn btn-cancel">Cancel</Link>
        </div>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Please Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Please enter date";
  }
  if (!values.content) {
    errors.content= "Please enter content";
  }
  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPosts })(PostsNew);
