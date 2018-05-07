import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { allPosts } from '../queries'

class AllPosts extends Component {

  AllPosts() {
    console.log(this.props.data.allPosts)
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.allPosts) return (
      this.props.data.allPosts.map((post) => {
        return (<div key={post.id}>
          {post.title}
        </div>)
      })
    )
  }

  render() {
    return (
      <div>
        {this.AllPosts()}
      </div>
    )
  }

}

export default graphql(allPosts)(AllPosts)