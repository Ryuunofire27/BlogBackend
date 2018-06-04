const mongoose = require('../database/db');

const responseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  text: String,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true , versionKey: false});

module.exports = mongoose.model('Response', responseSchema);
