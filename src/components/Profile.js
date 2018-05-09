import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import NewPost from './NewPost'
import CreatedPosts from './CreatedPosts'
import SavedPosts from './SavedPosts'
import placeholderProfilePicture from '../images/iconmonstr-user-1.svg'
import gql from "graphql-tag"

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
    console.log(this.props)
    if (this.props.user.loading || this.props.signedInUser.loading) return <div>Loading</div>
    if (this.props.user.error || this.props.signedInUser.error) return <div>Error</div>
    if (this.props.user.user) return (
      <div className="profile--container">
        <div className="profile--userdata">
          { this.props.user.user.photo ? <img src={this.props.user.user.photo} alt="Profile"/> : <img src={placeholderProfilePicture} alt="Placeholder"/>}
          <div className="profile--username">{this.props.user.user.username}</div>
        </div>
        <div className="profile--nav-posts">
          <button onClick={this.displayCreatedPosts} className="profile--button">Created</button>
          <button onClick={this.displaySavedPosts} className="profile--button">Saved</button>
          { this.props.signedInUser.signedInUser && this.props.user.user.id === this.props.signedInUser.signedInUser.id
            ? <button onClick={this.displayNewPost} className="profile--button">New</button> 
            : null
          }
        </div>
        <div>
          { this.state.display === "createdposts" 
            ? <CreatedPosts userData={this.props.user.user} />
            : this.state.display === "savedposts"
            ? <SavedPosts userData={this.props.user.user} />
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

export default compose(
  graphql(gql`
  query user($id: String!) {
    user (id: $id) {
      id
      username
      displayName
      photo
    }
  }
`, {name: "user", options: (props) => ({ variables: { id: props.match.params.id }})}),
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
  `, {name: "signedInUser"})
)(Profile)
