console.log("Hello nodemon");

const fs = require('fs');

//su dung thu vien express
const express = require('express');
var app = express();

//set public folder public, thong thuong phan client la phan public
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('./public/index.html');
});

app.get('/image/add', (req, res) =>{
  var imageinfo = {
    name: req.query.name,
    imageLink: req.query.imagelink,
    description: req.query.description
  }
  console.log(imageinfo);
  fs.appendFileSync('imageData.json', JSON.stringify(imageinfo));
  res.send("Success");
})

app.get('/image/get', (req, res) =>{
  var myContent = fs.readFileSync('imageData.json', 'utf-8');

  myContent = "[" + myContent.replace(/}+\s+{/g,'}{')+ "]";
  myContent = myContent.replace(/}{/g,'},{');

  var myJSON = JSON.parse(myContent);
  var response = '';
  for (let i = 0; i< myJSON.length; i++){
    response += '<p>'+ myJSON[i].name +":"+ myJSON[i].description +'</p>'+'<img src="' + myJSON[i].imageLink +'" style="width:192px;height:168px;">';
  }
  res.send(response);

})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//open port to running local
app.listen(6969, (req, res) => {
  console.log('hey trinhthang.....app listen on 6969');
});
