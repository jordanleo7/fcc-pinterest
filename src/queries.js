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
      dateCreated
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

const post = gql`
  query post($id: String!) {
    post (id: $id) {
      id
      title
      url
      dateCreated
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
      dateCreated
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
      dateCreated
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
      dateCreated
      createdBy {
        id
        username
        displayName
        photo
      }
    }
  }
`

const toggleSavePost = gql`
  mutation toggleSavePost($id: String!) {
    toggleSavePost(id: $id) 
    {
      id
      title
      url
      dateCreated
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

const deletePost = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
    {
      id
      title
      url
      dateCreated
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

export { signedInUser, allPosts, user, post, usersCreatedPosts, usersSavedPosts, createPost, toggleSavePost, deletePost }