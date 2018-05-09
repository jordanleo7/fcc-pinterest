import * as React from 'react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";
import { graphql, compose, Mutation } from 'react-apollo'
import { allPosts, signedInUser, toggleSavePost } from '../queries'
import Masonry from 'react-masonry-component'
import grayStar from '../images/iconmonstr-star-1-gray.svg'
import greenStar from '../images/iconmonstr-star-1-green.svg'

class AllPosts extends React.Component {

  AllPosts() {
    console.log(this.props)
    if (this.props.allPosts.loading || this.props.signedInUser.loading) return <div>Loading</div>
    if (this.props.allPosts.error || this.props.signedInUser.error) return <div>Error</div>
    if (this.props.allPosts.allPosts && this.props.signedInUser.signedInUser) return (
      this.props.allPosts.allPosts.map((post) => {

        // Check if user saved this post
        const didUserSavePost = post.savedBy.findIndex(oid => String(oid.id) === this.props.signedInUser.signedInUser.id)

        return (
          <div key={post.id} className="masonry--grid-item">
            <img src={post.url} alt={post.title} className="masonry--grid-item-photo"/>
            <div>
              <p className="masonry--grid-item-from">From <Link to={`/profile/${post.createdBy.id}`}>{post.createdBy.username}</Link></p>
              <Mutation mutation={toggleSavePost}>
                {(toggleSavePost) => (
                  <button onClick={() => {
                    toggleSavePost({
                      variables: { id: post.id }
                    })
                  }}
                    className="masonry--grid-item-star-button"
                  >
                  { didUserSavePost 
                    ? <div><span className="masonry--grid-item-star-button-count">{post.savedBy.length}</span><img src={grayStar} alt="gray star" /></div>
                    : <div><span className="masonry--grid-item-star-button-count">{post.savedBy.length}</span><img src={greenStar} alt="green star" /></div>
                  }
                  </button>
                )}
              </Mutation>
            </div>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <Masonry className="masonry--grid">
        {this.AllPosts()}
      </Masonry>
    )
  }

}

export default compose(
  graphql(gql`
  {
    allPosts {
      id
      title
      url
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
  `, {name: "allPosts"}),
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
)(AllPosts)