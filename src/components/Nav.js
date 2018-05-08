import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInUser from './SignedInUser'

class Nav extends Component {

  render() {
    return (
      <div>
        <nav className="nav--container">
          <Link to={"/"}><h1 className="nav--logo">PINTERCLONE</h1></Link>
          <SignedInUser/>
        </nav>
      </div>
    )
  }

}

export default Nav