import * as React from 'react'
import { graphql } from 'react-apollo'
import { user, usersCreatedPosts, usersSavedPosts } from '../queries'
import Masonry from 'react-masonry-component'

class Profile extends React.Component {

  Profile() {
    console.log(this.props.data)
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.user) return (
      <div className="profile--container">
        <div className="profile--userdata">
          <span className="profile--username">{this.props.data.user.username}</span>
          <img 
            src={this.props.data.user.photo} 
            alt="profile picture"
          />
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
