const pm = require('../models/post');

class PostController{
  static getAll(req, res){
    const post = {
      limit: req.query.limit || 10,
      page: req.query.page || 1
    }
    pm.getAll(post, (err, posts) => {
      if (err) return res.send({ err: 'No se pudo obtener los post' });
      res.send({ posts });
    });
  }

  static get(req, res){
    const id = req.params.id;
    pm.get(id, (err, post) => {
      if (err) return res.send({ err: 'No se pudo obtener el post' });
      res.send({ post });
    });
  }
  static insert(req, res){
    const post = {
      user: req.params.id,
      img: req.body.img == '' ? 'https://cdn-images-1.medium.com/max/512/1*6kK9j74vyOmXYm1gN6ARhQ.png' : req.body.img,
      extract: req.body.extract,
      post: req.body.post
    };
    pm.insert(post, (err) => {
      if (err) return res.send({ err: 'No se pudo crear el post, intentelo nuevamente' });
      res.send({ msg: 'Post creado exitosamente' });
    });
  }

  static update(req, res){
    const post = {
      postId: req.params.postId, 
      user: req.params.id,
      img: req.body.img,
      extract: req.body.extract,
      post: req.body.post
    };
    pm.update(post, (err) => {
      if (err) return res.send({ err: 'No se pudo editar el post, intentelo nuevamente' });
      res.send({ msg: 'Post editado exitosamente' });
    });
  }

  static delete(req, res){
    const post = {
      postId: req.params.postId
    };
    pm.delete(post, (err) => {
      if (err) return res.send({ err: 'No se pudo eliminar el post, intentelo nuevamente' });
      res.send({ msg: 'Post eliminado exitosamente' });
    });
  }

}

module.exports = PostController;