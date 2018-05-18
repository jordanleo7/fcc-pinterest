import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInUser from './SignedInUser'

class Nav extends Component {

  render() {
    return (
      <div>
        <nav className="nav--container">
          <div className="item--container">
            <Link to={"/"}><h1 className="nav--logo">PINTERCLONE</h1></Link>
            <SignedInUser/>
          </div>
        </nav>
      </div>
    )
  }

}

export default Nav