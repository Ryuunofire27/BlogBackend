const router = require('express').Router();
const ur = require('./user-route');
const pr = require('./post-route');
const cr = require('./comment-route');

router
  .use('/user', ur)
  .use('/post', pr)
  .use('/comment', cr)

module.exports = router;
