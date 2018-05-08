import * as React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { usersCreatedPosts } from '../queries'
import Masonry from 'react-masonry-component'
import grayStar from '../images/iconmonstr-star-1-gray.svg'

class CreatedPosts extends React.Component {

  CreatedPosts() {
    console.log(this.props.userData, 'userData')
    console.log(this.props.data.usersCreatedPosts)
    if (this.props.data.loading) return <div>Loading</div>
    if (this.props.data.error) return <div>Error</div>
    if (this.props.data.usersCreatedPosts) return (
      this.props.data.usersCreatedPosts.map((post) => {
        return (
          <div key={post.id} className="masonry--grid-item">
            <img src={post.url} alt={post.title} className="masonry--grid-item-photo"/>
            <div>
              <p className="masonry--grid-item-from">From <Link to={`/profile/${post.createdBy.id}`}>{post.createdBy.username}</Link></p>
              <img src={grayStar} alt="gray star" className="masonry--grid-item-star" />
            </div>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <Masonry className="masonry--grid">
        {this.CreatedPosts()}
      </Masonry>
    )
  }

}

export default graphql(usersCreatedPosts, {
  options: (props) => ({ variables: { id: props.userData.id }})
})(CreatedPosts)
