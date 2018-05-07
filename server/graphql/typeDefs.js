const typeDefs = `

type User {
  id: ID
  twitterId: String
  username: String
  displayName: String
  photos: [String]
}

type Post {
  id: ID
  title: String
  url: String
  createdBy: User
  savedBy: [User]
}

type Query {
  signedInUser: User
  user: User
  post: Post
  usersCreatedPosts: [Post]
  usersSavedPosts: [Post]
  allPosts: [Post]
}

type Mutation {
  createPost(title: String!, url: String!): Post
  toggleSavePost(id: String!): Post
}

`

module.exports = typeDefs