import gql from 'graphql-tag'

const signedInUser = gql`
  {
    signedInUser {
      id
      twitterId
      username
      displayName
      photo
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
        username
      }
      savedBy {
        id
        username
      }
    }
  }
`

const user = gql`
  query user($id: String!) {
    user (id: $id) {
      id
      username
      displayName
      photo
    }
  }
`
const usersCreatedPosts = gql`
  query usersCreatedPosts($id: String!) {
    usersCreatedPosts (id: $id) {
      id
      title
      url
      createdBy {
        id
        username
        displayName
        photo
      }
      savedBy {
        id
        username
        displayName
        photo
      }
    }
  }
`

const usersSavedPosts = gql`
  query usersSavedPosts($id: String!) {
    usersSavedPosts(id: $id) {
      id
      title
      url
      createdBy {
        id
        username
        displayName
        photo
      }
      savedBy {
        id
        username
        displayName
        photo
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
        username
        displayName
        photo
      }
    }
  }
`

export { signedInUser, allPosts, user, usersCreatedPosts, usersSavedPosts, createPost }