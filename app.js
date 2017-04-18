console.log('Hello nodemon');

// const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');

const imageController = require(__dirname + '/modules/images/imageController.js');

var app = express();

//set public folder public
//app.use(urlencoded)
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

  //luu lai vao file
  imageController.saveImageCollection(imageInfoCollection);
  // fs.writeFileSync('imageData.json', JSON.stringify(imageInfoCollection));

  //bao thanh cong
  res.send('Đã thêm 1 gái vào giỏ hàng :3');
})

app.get('/image', (req,res) => {

  var imageInfoCollection = imageController.fetchImageCollection();

  var htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div>
    <img src="${data.imageLink}">
    <div>${data.description}</div>`;
  });
  res.send(htmlString);
})

app.put('/image', (req, res) => {
  var imageInfoCollection = imageController.fetchImageCollection();

  var name = req.body.name;
  var imageLink = req.body.imageLink;
  var description = req.body.description;

  //tim kiem bang name,link va thay the
  imageInfoCollection.forEach((data) => {
    if (data.name == name){
      data.imageLink = imageLink;
      data.description = description
    }
    // else if (name =='' && data.imageLink == imageLink) {
    //   var imageInfo = {
    //     name : name,
    //     imageLink : imageLink,
    //     description : description
    //   }
    //   imageInfoCollection.push(imageInfo);
    // }
  })

  imageController.saveImageCollection(imageInfoCollection);

})

app.delete('/image', (req, res) => {
  var imageInfoCollection = imageController.fetchImageCollection();

  var name = req.body.name;

  //filter nhung obj co ten la name
  imageInfoCollection = imageInfoCollection.filter(function(el){
    return el.name !== name;
  })

  imageController.saveImageCollection(imageInfoCollection);
})
//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
