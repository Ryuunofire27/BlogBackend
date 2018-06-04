const router = require('express').Router();
const uc = require('../controllers/UserController');
const pc = require('../controllers/PostController');
const cc = require('../controllers/CommentController');

router
  .post('/', uc.register)
  .post('/login', uc.login)
  .post('/:id/post', pc.insert)
  .post('/:id/post/:postId/comment', cc.insert)
  .put('/:id/comment/:idComment', cc.update)
  .put('/:id/comment/:idComment/like', cc.like)
  .put('/:id/comment/:idComment/dislike', cc.dislike)
  .delete('/:id/post/:postId', pc.delete)

module.exports = router;