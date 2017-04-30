const mongoose = require('mongoose');

var bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

var usersModel = new Schema({
  id : {type : Number, required : true},
  username : {type : String, required : true},
  password : {type : String, required : true},
  email : {
    type : String,
    // validate : {
    //   validator : function(email){
    //     regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     return regex.test(email);
    //   },
    //   message : 'invalid email'
    // }
  },
  info : {type : String},
  active : {type : Boolean}
});

usersModel.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  //generrate the salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err){
      return next(err);
    } else {
      //hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err){
          return next(err);
        } else {
          user.password = hash;
          next();
        }
      })
    }
  })
})

// usersModel.methods.comparePassword = function(candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return callback(err);
//     else {
//       callback(null, isMatch)
//     }
//   })
// }

module.exports = mongoose.model('users', usersModel);
