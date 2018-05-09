const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

authRouter.get('/auth/logout', (req,res) => {
  req.logout();
  res.redirect('/');
})

authRouter.get('/auth/twitter', 
passport.authenticate('twitter'));

authRouter.get('/auth/twitter/callback', 
passport.authenticate('twitter', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

authRouter.get('/auth/isSignedIn', function (req, res) {
  if (req.user) {
    console.log(req.user);
    res.send(req.user);
  } else {
    console.log('Not signed in');
    res.send(null);
  }
})

module.exports = authRouter;