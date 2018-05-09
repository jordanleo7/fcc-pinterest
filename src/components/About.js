import React from 'react'

const About = () => (
  <div className="about--container">
    <h3>About</h3>
    <ul>
      <li>This project is based on freeCodeCamp's <a href="https://www.freecodecamp.org/challenges/build-a-pinterest-clone"target="_blank" rel="noopener noreferrer">Build a Pinterest Clone</a> project.</li>
    </ul>
    <h3>User Stories</h3>
    <ul>
      <li>As an unauthenticated user, I can login with Twitter.</li>
      <li>As an authenticated user, I can link to images.</li>
      <li>As an authenticated user, I can delete images that I've linked to.</li>
      <li>As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.</li>
      <li>As an unauthenticated user, I can browse other users' walls of images.</li>
      <li>As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image.</li>
    </ul>
    <h3>Dependencies</h3>
    <ul>
      <li>Front end: React, React Router, React Apollo, React Masonry Component</li>
      <li>Back end: Node, Express, GraphQL, Mongoose, Passport-Twitter</li>
    </ul>
    <h3>My Links</h3>
    <ul>
      <li><a href="https://jordanleo7.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
      <li><a href="https://www.linkedin.com/in/jordanleo7/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
    </ul>
  </div>
)

export default About
