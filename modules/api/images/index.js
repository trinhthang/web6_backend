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
  try {
    if (req.query.id){
      imagesController.readById(req.query.body)
    } else imagesController.read();
  } catch (e) {
    console.log(e);
  }
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
  try {
    var id = req.body.id;
    imagesController.deleteImageCollectionById(id);
  } catch (e) {
    console.log(e);
  }
})

module.exports = Router;
