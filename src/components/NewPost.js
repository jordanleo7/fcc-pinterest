import * as React from 'react'
import { Redirect } from "react-router-dom"
import { graphql, compose, Mutation } from 'react-apollo'
import { signedInUser, createPost, usersCreatedPosts, allPosts } from '../queries'
import placeholderPicture from '../images/iconmonstr-picture-1.svg'

class NewPost extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      url: "",
      redirectToNewPage: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.showPlaceholder = this.showPlaceholder.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  showPlaceholder(event) {
    event.target.src = placeholderPicture
  }

  render () {

    if (this.state.redirectToNewPage) {
      return <Redirect to="/" />;
    }

    return (
      <div className="newpost--container">
        <Mutation 
          mutation={createPost}
          refetchQueries={
            [{ query: usersCreatedPosts, variables: { id: this.props.data.signedInUser.id } },
              { query: allPosts }
            ]
          }
        >
          {createPost => (
            <div className="newpost--form-container">
              <form className="newpost--form"
                onSubmit={event => {
                event.preventDefault();
                createPost({ variables : {
                  title: this.state.title,
                  url: this.state.url,
                }})
                this.setState({
                  redirectToNewPage: true
                })
              }}
              >
                <div>
                  <label className="newpost--label">
                    <span>
                    Title
                    </span>
                    <input
                      name="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      maxLength="200"
                      required
                    />
                  </label>

                  <label className="newpost--label">
                    <span>
                    Image URL
                    </span>
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
        <div className="newpost--img">
          <span>Image Preview</span>
          <img src={this.state.url} alt="URL preview" onError={this.showPlaceholder}/>
          <span>If the image loads, you're good to go.</span>
        </div>
        <div className="clearfix"/>
      </div>
    )
  }
}

export default compose(
  graphql(signedInUser),
  graphql(createPost)
)(NewPost)