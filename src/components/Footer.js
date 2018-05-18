import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div>
    <nav className="footer--container">
      <div className="item--container">
        <a href="https://github.com/jordanleo7/fcc-pinterest" target="_blank" rel="noopener noreferrer">GitHub</a>
        <Link to={"/about"}>About</Link>
      </div>
    </nav>
  </div>
)

export default Footer