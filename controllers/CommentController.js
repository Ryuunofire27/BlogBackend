const cm = require('../models/comment');

class CommentController{
  static getAll(req, res){
    const post = {
      id: req.params.id,
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1
    };
    cm.getAll(post, (err, comments) => {
      if (err) return res.send({ err: 'No se pudo obtener los comentarios' });
      res.send({ comments });
    });
  }

  static insert(req, res){
    const comment = {
      user: req.params.id || undefined,
      post: req.params.postId,
      text: req.body.text,
    };
    cm.insert(comment, (err, newComment) => {
      if (err) return res.send({ err: 'No se pudo guardar el commentario' });
      res.send({ msg: 'Comentario enviado satisfactoriamente',
      comment: newComment });
    });
  }

  static update(req, res){
    const comment = {
      user: req.params.id,
      id: req.params.idComment,
      text: req.body.text,
    };
    cm.update(comment, (err, msg) => {
      if (err) return res.send({ err: msg });
      res.send({ msg: 'Comentario editado satisfactoriamente' });
    });
  }

  static delete(req, res){
    const id = req.params.id;
    cm.delete(id, (err) => {
      if (err) return res.send({ err: 'No se pudo eliminar el commentario' });
      res.send({ msg: 'Comentario eliminado satisfactoriamente' });
    });
  }

  static like(req, res){
    const like = {
      user: req.params.id,
      comment: req.params.idComment,
      add: req.body.add
    };
    cm.like(like, (err, comment) => {
      if (err) return res.send({ err: 'No se pudo modificar el like' });
      res.send(comment);
    });
  }

  static dislike(req, res){
    const dislike = {
      user: req.params.id,
      comment: req.params.idComment,
      add: req.body.add
    };
    cm.dislike(dislike, (err, comment) => {
      if (err) return res.send({ err: 'No se pudo modificar el dislike' });
      res.send(comment);
    });
  }
}

module.exports = CommentController;