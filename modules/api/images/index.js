const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController');

Router.post('/', (req, res) => {

  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  //luu vao database
  imagesController.addImage(imageInfo);

  //bao thanh cong
  res.send('Success!');
})

Router.get('/', (req, res) => {
  imagesController.getAll();
})

Router.put('/', (req, res) => {
  var newData = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  imagesController.updateImageCollectionById(newData.id, newData);
})

Router.delete('/', (req, res) => {
  var id = req.body.id;
  imagesController.deleteImageCollectionById(id);
})

module.exports = Router;
