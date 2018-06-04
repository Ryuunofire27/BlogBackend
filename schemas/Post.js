const mongoose = require('../database/db');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  img: String,
  extract: String,
  post: String,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true , versionKey: false});

module.exports = mongoose.model('Post', postSchema);
