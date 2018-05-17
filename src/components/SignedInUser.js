import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { signedInUser } from '../queries'

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.data.loading) return <div className="nav--signin">Loading</div>
    if (this.props.data.error) return <div className="nav--signin">There was an error loading this content. Please try again.</div>
    if (this.props.data.signedInUser) return (
      <div className="nav--signin">
        <Link to={`/profile/${this.props.data.signedInUser.id}`}>Profile</Link>
        <a href={'/auth/logout'}>
          Sign out
        </a>
      </div>
    )
    return (
      <div className="nav--signin">
        <a href={'/auth/twitter'}>
          Sign in
        </a>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.SignedInUser()}
      </div>
    )
  }

}

export default graphql(signedInUser)(SignedInUser)