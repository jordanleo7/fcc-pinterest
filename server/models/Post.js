const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  source: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('pintclone-post', postSchema);