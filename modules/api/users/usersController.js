const usersModel = require('./usersModel');

var addUser = (data, callback) => {
  usersModel.findOne({}).select('id').sort({id : -1})
  .exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      var id;
      if (doc && doc.id) {
        id = doc.id + 1;
      } else {
        id = 1;
      }
      data.id = id;
      usersModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log(doc);
          callback(null, doc);
        }
      })
    }
  })
}

var searchUserByName = (name, callback) => {
  usersModel.find({"username" : {"$regex": name} }, (err, doc) => {
    if (err){
      callback(err);
    } else {
      callback(null,doc);
    }
  })
}
var getAllUser = (callback) => {
  usersModel.find({}, (err, doc) => {
    if (err){
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

var getUserById = (id, callback) => {
  usersModel.find({"id" : id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}
module.exports = {
  addUser,
  searchUserByName,
  getAllUser,
  getUserById
}
