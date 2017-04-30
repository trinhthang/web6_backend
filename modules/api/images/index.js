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

  console.log('post data ',req.body);

  imagesController.addImage(imageInfo, (err, doc) => {
    if (err){
      console.log(err);
      res.send("Co loi xay ra");
    } else {
      res.send("Success")
    }
  });
});

Router.get('/', (req, res) => {
  if (req.query.id) {
    var id = req.query.id;
    imagesController.getImageById(id, (err, doc) => {
      if (err) {
        console.log(err);
        red.send("Co loi");
      } else {
        res.send(doc);
      }
    })
  } else if (req.query.name) {
    imagesController.searchImageByName(req.query.name, (err, doc) => {
      if (err){
        console.log(err);
      } else {
        res.send(doc);
      }
    })
  } else {
    imagesController.getAllImage((err, doc) => {
      if (err){
        console.log(err);
        res.send("Co loi roi");
      } else {
        res.send(doc);
      }
    })
  }
})

Router.put('/', (req, res) => {
  try {
    var newData = {
      id : req.body.id,
      name : req.body.name,
      imageLink : req.body.imageLink,
      description : req.body.description
    }

    imagesController.updateImageById(newData);
  } catch (e) {
      console.log(e);
  }
})

Router.delete('/', (req, res) => {
  try {
    var id_delete = req.body.id;
    if (id_delete){
      imagesController.deleteImageById(id_delete);
      res.send("Deleted !")
    } else {
      res.send("id not found!");
    }
  } catch (e) {
    console.log(e);
  }
})

module.exports = Router;
