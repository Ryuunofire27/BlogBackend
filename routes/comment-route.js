const router = require('express').Router();
const cc = require('../controllers/CommentController');

router
  .post('/', cc.insert)
  .put('/:id/like', cc.like)
  .put('/:id/dislike', cc.dislike)
  .delete('/:id', cc.delete)

module.exports = router;