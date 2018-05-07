import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { signedInUser } from '../queries'

class SignedInUser extends Component {

  SignedInUser() {
    console.log(this.props)
    if (this.props.loading) return null
    if (this.props.error) return <div>Error</div>
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