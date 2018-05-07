import gql from 'graphql-tag'

const signedInUser = gql`
  {
    signedInUser {
      id
      twitterId
      username
      displayName
      photos
    }
  }
`

const allPosts = gql`
  {
    allPosts {
      id
      title
      url
      createdBy {
        id
      }
      savedBy {
        id
      }
    }
  }
`

const createPost = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url)
    {
      id
      title
      url
      createdBy {
        id
      }
    }
  }
`

export { signedInUser, allPosts, createPost }