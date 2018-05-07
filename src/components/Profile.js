import * as React from 'react'
import { graphql } from 'react-apollo'
import { user, usersCreatedPosts, usersSavedPosts } from '../queries'
import Masonry from 'react-masonry-component'

class Profile extends React.Component {

  Profile() {
    console.log(this.props.data)
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.allPosts) return (
      <div>hi</div>
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

export default graphql(user)(Profile)
