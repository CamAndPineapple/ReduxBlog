import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router';

class PostIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <Link to={"posts/" + post.id}>
          <li className="list-group-item" key={post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>

          </li>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>ReduxBlog</h1>
          <Link to="/posts/new" className="btn-add-post">
            Add a Post
          </Link>
        </div>
        <div className="post-headers">
          <div className="post-header title">Title</div>
          <div className="post-header date">Date</div>
        </div>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts.all}
}

// skipped mapDispatchToProps using helper {fetchPosts: fetchPosts} in connect()
export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostIndex);
