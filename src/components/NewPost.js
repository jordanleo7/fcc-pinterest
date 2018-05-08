import * as React from 'react'
import { graphql, compose, Mutation } from 'react-apollo'
import { signedInUser, createPost } from '../queries'

class NewPost extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      url: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <Mutation 
          mutation={createPost}
        >
          {createPost => (
            <div>
              <form onSubmit={event => {
                event.preventDefault();
                createPost({ variables : {
                  title: this.state.title,
                  url: this.state.url
                }})
                this.setState({
                  title: "",
                  url: ""
                })
                alert('Post created!')
              }}
              >
                <div>
                  <label>
                    Title:
                    <input
                      name="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      maxLength="200"
                      required
                    />
                  </label>

                  <label>
                    Image URL:
                    <input
                      name="url"
                      type="text"
                      value={this.state.url}
                      onChange={this.handleInputChange}
                      maxLength="500"
                      required
                    />
                  </label>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          )}
        </Mutation>
        <div>
          Image Preview:
          <img src={this.state.url} alt="Please enter a URL" />
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(signedInUser),
  graphql(createPost)
)(NewPost)