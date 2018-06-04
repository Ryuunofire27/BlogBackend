const Comment = require('../schemas/Comment');
const Post = require('../schemas/Post');

class CommentModel{
  static getAll(post, cb) {
    Comment
      .find({ post: post.id })
      .skip(post.limit * (post.page - 1))
      .limit(post.limit)
      .then((commentsFound) => {
        cb(null, commentsFound);
      })
      .catch(err => cb(err));
  }

  static insert(comment, cb) {
    const newComment = new Comment(comment);
    newComment.save((err) => {
      if(err) return cb(err);
      cb(null, newComment);
    });
  }

  static update(comment, cb) {
    Comment
      .findById(comment.id)
      .then((commentFound) => {
        if (comment.user != commentFound.user) return cb(err, 'No puedes editar el comentario, falta credenciales');
        commentFound.text = comment.text || commentFound.text;
        commentFound.save((err) => {
          if (err) return cb(err, 'No se pudo editar el comentario');
          cb(null); 
        });
      })
      .catch(err => cb(err, 'No se pudo editar el commentario'));
  }
  
  static delete(id, cb) {
    Comment
      .findByIdAndRemove(id)
      .then((commentFound) => {
        return Post.find(commentFound.post);
      })
      .then((postFound) => {
        postFound.comments = postFound.comments.filter((c) => {
          if(c != id) return c;
        })
        postFound.save((err) => {
          if (err) return cb(err);
          cb(null);
        })
      })
      .catch(err => cb(err));
  }

  static like(like, cb){
    Comment
      .findById(like.comment)
      .then((commentFound) => {
        if(like.add == 1){
          commentFound.like.push(like.user);
        }else{
          const index = commentFound.like.indexOf(like.user);
          if(index != -1) commentFound.like.splice(index, 1);
        }
        commentFound.save((err) => {
          if (err) return cb(err);
          cb(null, commentFound);
        }) 
      })
      .catch(err => cb(err));
  }

  static dislike(dislike, cb){
    Comment
      .findById(dislike.comment)
      .then((commentFound) => {
        if(dislike.add == 1){
          commentFound.dislike.push(dislike.user);
        }else{
          const index = commentFound.dislike.indexOf(dislike.user);
          if(index != -1)commentFound.dislike.splice(index, 1);
        }
        commentFound.save((err) => {
          if (err) return cb(err);
          cb(null, commentFound);
        }) 
      })
      .catch(err => cb(err));
  }
}

module.exports = CommentModel;