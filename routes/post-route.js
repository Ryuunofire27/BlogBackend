const router = require('express').Router();
const pc = require('../controllers/PostController');
const cc = require('../controllers/CommentController');

router
  .get('/', pc.getAll)
  .get('/:id', pc.get)
  .get('/:id/comment', cc.getAll)
  .post('/:postId/comment', cc.insert)

module.exports = router;