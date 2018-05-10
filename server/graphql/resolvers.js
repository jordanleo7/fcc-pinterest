const Post = require('../models/Post')
const User = require('../models/User')

const resolvers = {
  Post: {
    createdBy(id) {
      return User.findById(id.createdBy)
    },
    savedBy(id) {
      return User.find({ _id: id.savedBy })
    }
  },
  Query: {
    signedInUser(obj, args, context) {
      if (context.user) {
        return User.findById(context.user._id)
      } else return null
    },
    user(obj, args) {
      return User.findById(args.id)
    },
    post(obj, args) {
      return Post.findById(args.id)
    },
    usersCreatedPosts(obj, args) {
      return Post.find({ createdBy: args.id }, null, {sort: {dateCreated: -1}})
    },
    usersSavedPosts(obj, args) {
      return Post.find({ savedBy: args.id }, null, {sort: {dateCreated: -1}})
    },
    allPosts() {
      return Post.find({}, null, {sort: {dateCreated: -1}})
    }
  },
  Mutation: {
    createPost: (obj, args, context) => {
      if (context.user) {
        const newPost = new Post({
          title: args.title,
          url: args.url,
          createdBy: context.user._id
        })
        return newPost.save()
      }
    },
    toggleSavePost: (obj, args, context) => {
      if (context.user) {
        return Post.findById(args.id).then((post) => {
          // Check if user is post creator
          if (String(context.user._id) === String(post.createdBy)) {
            console.log('You can not save your own post')
            return null;
          }
          // search post for user
          const findUser = post.savedBy.findIndex(oid => String(oid) === context.user._id)
          // If user not found, add user to post's savedBy array
          if (findUser === -1) {
            post.savedBy.push(context.user._id)
            return post.save()
          }
          // if user found, remove user from post's savedBy array
          post.savedBy.splice(findUser, 1)
          return post.save()
        })
      }
    },
    deletePost: (obj, args, context) => {
      if (context.user) {
        Post.findById(args.id).then((post) => {
          if (String(post.createdBy) === String(context.user._id)) {
            return post.remove()
          } else return null
        })
      }
    }
  }

}

module.exports = resolvers
