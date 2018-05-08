const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
const User = require('../models/User')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)
	})
})

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: `${process.env.DOMAIN}/auth/twitter/callback`
  }, (token, tokenSecret, profile, done) => {
    User.findOne({ twitterId: profile.id }).then((currentUser) => {
      if (currentUser) {
        console.log('Signed in as ', currentUser, 'Full Twitter profile: ', profile)
        done(null, currentUser)
      } else {
        // If user not found, create them
        new User({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          photo: profile.photos[0].value
        }).save().then((newUser) => {
          console.log('New user created: ', newUser)
          done(null, newUser)
        })
      }
    })
  }
))