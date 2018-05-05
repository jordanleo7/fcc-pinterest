const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitterID: String,
})

module.exports = mongoose.model('pintclone-user', userSchema);