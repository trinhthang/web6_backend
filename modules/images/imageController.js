const fs = require('fs');

var fetchImageCollection = () => {
  var imageInfoCollection = [];

  try {
    var contents = fs.readFileSync('imageData.json','utf-8');

    imageInfoCollection = JSON.parse(contents);


  } catch (e) {
    console.log(e);
  }

  return imageInfoCollection;

}

var saveImageCollection = (data) => {
  fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var updateImage = (data) => {
  var imageInfoCollection = fetchImageCollection();

  for (let i=0; i<imageInfoCollection.length; i++){
    if (imageInfoCollection[i].name === data.name){
      imageInfoCollection[i] = data;
    }
  }

  saveImageCollection(imageInfoCollection);
}

var deleteImageByName = (name) => {
  var imageInfoCollection = fetchImageCollection();

  imageInfoCollection = imageInfoCollection.filter(function(element){
    return element.name !== name;
  })

  saveImageCollection(imageInfoCollection);
}

var findImageByName = (keyword) => {
  var imageInfoCollection = fetchImageCollection();

  if (keyword == '') return imageInfoCollection;

  imageInfoCollection = imageInfoCollection.filter(function(element){
    return element.name === keyword;
  });
  return imageInfoCollection;
}

module.exports = {
  fetchImageCollection : fetchImageCollection,
  saveImageCollection : saveImageCollection,
  updateImage : updateImage,
  deleteImageByName : deleteImageByName,
  findImageByName : findImageByName
}
