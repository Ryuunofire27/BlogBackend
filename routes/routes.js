const router = require('express').Router();
const ur = require('./user-route');

router
  .use('/user', ur)

module.exports = router;
