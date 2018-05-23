const crypto = require('crypto');
const mongoose = require('../database/db');
const key = require('../config/key').key;

const userSchema = new mongoose.Schema({
  // 1: Administrador, 2: Subadmi, 3: General
  type: { type: Number, default: 3},
  name: String,
  lastName: String,
  username: { type: String, unique: true},
  password: String,
  email: { type: String, unique: true},
  passwordResetToken: String,
  passwordResetExpres: Date,
  picture: { type: String, default: 'https://cdn-images-1.medium.com/max/512/1*6kK9j74vyOmXYm1gN6ARhQ.png'},
}, { timestamps: true });

userSchema.methods.comparePassword = (userPassword, pssw, cb) => {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(pssw);
  pssw = hmac.digest('hex');
  cb(userPassword == pssw)
};

module.exports = mongoose.model('User', userSchema);
