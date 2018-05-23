const User = require('../schemas/User');

class UserModel{
  static register(user, cb){
    User
      .findOne({ username: user.username, email: user.email})
      .then((userFound) => {
        if(userFound) return cb(new Error('Usuario encontrado'));
        const newUser = new User(user);
        newUser.save((err) => {
          if(err) return cb(err);
          cb(null, { msg: 'Registrado exitosamente' });
        });
      })
      .catch(err => cb(err));
  }

  static login(user, cb){
    User
      .findOne({username: user.username})
      .then((userFound) => {
        if(!userFound) return cb(new Error('Usuario no encontrado'));
        userFound.comparePassword(userFound.password, user.password, (isMatch) => {
          if(isMatch) return cb(null, userFound);
          cb(new Error('Contraseña equivocada'));
        });
      })
      .catch(err => cb(err));
  }
}

module.exports = UserModel;