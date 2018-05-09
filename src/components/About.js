import React from 'react'

const About = () => (
  <div className="about--container">
    <h3>About</h3>
    <ul>
      <li>User Story: As an unauthenticated user, I can login with Twitter.</li>
      <li>User Story: As an authenticated user, I can link to images.</li>
      <li>User Story: As an authenticated user, I can delete images that I've linked to.</li>
      <li>User Story: As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.</li>
      <li>User Story: As an unauthenticated user, I can browse other users' walls of images.</li>
      <li>User Story: As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)</li>
    </ul>
  </div>
)

export default About