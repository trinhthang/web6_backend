const express = require('express');

const Router = express.Router();

const usersController = require('./usersController');

Router.post('/', (req, res) => {

  var userInfo = {
    username : req.body.username,
    password : req.body.password
  }

  console.log('post user data', req.body);

  usersController.addUser(userInfo, (err, doc) => {
    if (err){
      console.log(err);
      res.send("Co loi xay ra");
    } else {
      res.send("Success")
    }
  });
});

Router.get('/', (req, res) => {
  var search_name = req.query.username;

  usersController.searchUserByName(search_name, (err, doc) => {
    if (err){
      console.log(err);
    } else {
      res.send(doc);
    }
  })
})

module.exports = Router;
