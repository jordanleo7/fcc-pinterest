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
  user(id: String): User
  post(id: String): Post
  usersCreatedPosts(id: String): [Post]
  usersSavedPosts(id: String): [Post]
  allPosts: [Post]
}

type Mutation {
  createPost(title: String!, url: String!): Post
  toggleSavePost(id: String!): Post
}

`

module.exports = typeDefs