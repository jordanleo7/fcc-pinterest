const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitterId: String,
  username: String,
  displayName: String,
  photo: String
})

module.exports = mongoose.model('pinterclone-user', userSchema);