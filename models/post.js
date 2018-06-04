const Post = require('../schemas/Post');
const Comment = require('../schemas/Comment');

class PostModel{
  static getAll(post, cb){
    Post
      .find()
      .sort('created_at desc')
      .skip(post.limit * (post.page - 1))
      .limit(post.limit)
      .then((postFound) => {
        cb(null, postFound);
      })
      .catch(err => cb(err));
  }

  static get(postId, cb){
    Post
      .findById(postId)
      .then((postFound) => {
        cb(null, postFound);
      })
      .catch(err => cb(err));
  }
  static insert(post, cb){
    const newPost = new Post(post);
    newPost.save((err) => {
      if(err) return cb(err);
      cb(null);
    })
  }

  static update(post, cb) {
    Post
      .findById(post.postId)
      .then((postFound) => {
        postFound.img = post.img || postFound.img;
        postFound.extract = post.extract || postFound.extract;
        postFound.post = post.post || postFound.post;
        postFound.save((err) => {
          if (err) return cb(err);
          cb(null);
        });
      })
      .catch( err => cb(err));
  }

  static delete(postId, cb) {
    Post
      .findByIdAndRemove(post.postId)
      .then(() => {
        return Comment.deleteMany({ post: post.postId });
      })
      .then((res) => {
        console.log(res);
        cb(null);
      })
      .catch(err => cb(err));
  }
}

module.exports = PostModel;