const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  url: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dateCreated: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('pinterclone-post', postSchema);