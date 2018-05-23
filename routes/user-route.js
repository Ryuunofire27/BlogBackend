const router = require('express').Router();
const uc = require('../controllers/UserController');

router
  .post('/', uc.register)
  .post('/login', uc.login)

module.exports = router;