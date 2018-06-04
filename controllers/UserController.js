const um = require('../models/user');
const crypto = require('crypto');
const key = require('../config/key').key;

class UserController{
  static register(req, res){
    if(!(req.body.password == req.body.repassword)) return res.status(406).send({ msg: 'Las constraseñas no coinciden'});
    const user = {
      type: req.body.type || 1,
      name: req.body.name,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      picture: req.files ? req.files.img : undefined
    }
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(user.password);
    user.password = hmac.digest('hex');
    um.register(user, (err, newUser) => {
      console.log(newUser);
      if(err) return res.status(500).send(err);
      res.send(newUser);
    });
  }

  static login(req, res){
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    um.login(user, (err, data) => {
      if(err) return res.send(err);
      res.send(data);
    });
  }
}

module.exports = UserController;