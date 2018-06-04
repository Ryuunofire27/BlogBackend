const mongoose = require('../database/db');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  text: String,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true , versionKey: false});

module.exports = mongoose.model('Comment', commentSchema);