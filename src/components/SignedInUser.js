import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { signedInUser } from '../queries'

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.signedInUser) return (
      <div className="nav--signin">
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