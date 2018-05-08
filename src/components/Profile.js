import * as React from 'react'
import { graphql } from 'react-apollo'
import { user, usersCreatedPosts, usersSavedPosts } from '../queries'
import Masonry from 'react-masonry-component'
import NewPost from './NewPost'
import CreatedPosts from './CreatedPosts'

class Profile extends React.Component {

  constructor(props) {
    super()
    this.state = {
      display: "createdposts"
    }
    this.displayCreatedPosts = this.displayCreatedPosts.bind(this);
    this.displaySavedPosts = this.displaySavedPosts.bind(this);
    this.displayNewPost = this.displayNewPost.bind(this);
  }

  displayCreatedPosts() {
    this.setState({ display: "createdposts" })
  }

  displaySavedPosts() {
    this.setState({ display: "savedposts" })
  }

  displayNewPost() {
    this.setState({ display: "newpost" })
  }

  Profile() {
    console.log(this.props.data)
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.user) return (
      <div className="profile--container">
        <div className="profile--userdata">
          <img 
            src={this.props.data.user.photo} 
            alt="profile"
          />
          <div className="profile--username">{this.props.data.user.username}</div>
        </div>
        <div className="profile--nav-posts">
          <button onClick={this.displayCreatedPosts} className="profile--button">Created</button>
          <button onClick={this.displaySavedPosts} className="profile--button">Saved</button>
          <button onClick={this.displayNewPost} className="profile--button">New</button>
        </div>
        <div>
          { this.state.display === "createdposts" 
            ? <CreatedPosts userData={this.props.data.user} />
            : this.state.display === "savedposts"
            ? <div>saved posts</div>
            : <NewPost/>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.Profile()}
      </div>
    )
  }
}

export default graphql(user, {
  options: (props) => ({ variables: { id: props.match.params.id }})
})(Profile)
