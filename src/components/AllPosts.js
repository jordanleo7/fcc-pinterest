import * as React from 'react'
import { graphql } from 'react-apollo'
import { allPosts } from '../queries'
import Masonry from 'react-masonry-component'

class AllPosts extends React.Component {

  AllPosts() {
    console.log(this.props.data.allPosts)
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.allPosts) return (
      this.props.data.allPosts.map((post) => {
        return (
          <div key={post.id} className="masonry--grid-item">
            <img src={post.url} alt={post.title}/>
            <div>
              <p>From {post.createdBy.username}</p>
              
            </div>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <Masonry className="masonry--grid">
        {this.AllPosts()}
      </Masonry>
    )
  }

}

export default graphql(allPosts)(AllPosts)