import * as React from 'react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";
import { graphql, compose, Mutation } from 'react-apollo'
import { toggleSavePost } from '../queries'
import grayStar from '../images/iconmonstr-star-1-gray.svg'
import greenStar from '../images/iconmonstr-star-1-green.svg'
import placeholderPicture from '../images/iconmonstr-picture-1.svg'

class PostView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    this.showPlaceholder = this.showPlaceholder.bind(this)
  }

  showPlaceholder(event) {
    event.target.src = placeholderPicture
  }

  PostView() {

    if (this.props.post.loading || this.props.signedInUser.loading) return (
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      )
    if (this.props.post.error || this.props.signedInUser.error) return <div>Error</div>

    let post = this.props.post.post
    // Check if signed in user saved this post
    let didUserSavePost = -1;
    this.props.signedInUser.signedInUser 
      ? didUserSavePost = post.savedBy.findIndex(oid => String(oid.id) === this.props.signedInUser.signedInUser.id)
      : null

    return (
      <div className="postview--container">
        <img src={post.url} alt={post.title} onError={this.showPlaceholder} className="postview--image"/>
        <div>
          <div className="postview--title">{post.title}</div>
          <p className="postview--from">From <Link to={`/profile/${post.createdBy.id}`}>{post.createdBy.username}</Link></p>
          <Mutation mutation={toggleSavePost}>
            {(toggleSavePost) => (
              <button onClick={() => {
                toggleSavePost({
                  variables: { id: post.id }
                })
              }}
                className="postview--button"
              >
              { didUserSavePost 
                ? <div><span className="postview--count">{post.savedBy.length}</span><img src={grayStar} alt="gray star" /></div>
                : <div><span className="postview--count">{post.savedBy.length}</span><img src={greenStar} alt="green star" /></div>
              }
              </button>
            )}
          </Mutation>
        </div>
      </div>
    )
    
  }

  render() {
    return (
      <div className="">
        {this.PostView()}
      </div>
    )
  }

}

export default compose(
  graphql(gql`
  query post($id: String!) {
    post (id: $id) {
      id
      title
      url
      dateCreated
      createdBy {
        id
        username
      }
      savedBy {
        id
        username
      }
    }
  }
`, {name: "post", options: (props) => ({ variables: { id: props.match.params.id }})}),
  graphql(gql`
  {
    signedInUser {
      id
      twitterId
      username
      displayName
      photo
    }
  }
  `, {name: "signedInUser"}),
  graphql(toggleSavePost)
)(PostView)