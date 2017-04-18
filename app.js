console.log('Hello nodemon');

//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');

const imageController = require(__dirname + '/modules/images/imageController.js');

var app = express();

//set public folder public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send('./public/index.html');
})



app.post('/image', (req, res) => {
  //doc du liu tu file imageData
  var imageInfoCollection = imageController.fetchImageCollection();
  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  //push data moi vao colection
  imageInfoCollection.push(imageInfo);

  imageController.saveImageCollection(imageInfoCollection);

  //bao thanh cong
  res.send('Đã thêm 1 gái vào giỏ hàng :3');
})

app.get('/image', (req,res) => {
  var name = req.query.keyword;
  var imageInfoCollection;
  if (req.query.displayall === "ALL"){
    imageInfoCollection = imageController.fetchImageCollection();
  }
  else imageInfoCollection = imageController.findImageByName(name);

  var htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div>
    <img src="${data.imageLink}">
    <div>${data.description}</div>`;
  });

  res.send(htmlString);
})

app.put('/image', (req, res) => {
  var data = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  imageController.updateImage(data);

})

app.delete('/image', (req, res) => {

  var name = req.body.name;

  imageController.deleteImageByName(name);

})
//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
