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

var deleteImageByName = (name) => {
  var imageInfoCollection = fetchImageCollection();

  imageInfoCollection = imageInfoCollection.filter(function(element){
    return element.name !== name;
  })

  saveImageCollection(imageInfoCollection);
}

module.exports = {
  fetchImageCollection : fetchImageCollection,
  saveImageCollection : saveImageCollection,
  deleteImageByName : deleteImageByName
}
