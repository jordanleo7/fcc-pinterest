import React from 'react'
import AllPosts from './AllPosts'

const Home = () => (
  <div>
    <div className="home--container">
      <h3>All Posts</h3>
      <div className="allposts--container">
        <AllPosts/>
      </div>
    </div>
  </div>
)

export default Home;