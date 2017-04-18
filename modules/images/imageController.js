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

var deleteImageByName = (imageInfoCollection, name) => {
  imageInfoCollection = imageInfoCollection.filter(function(el){
    return el.name !== name;
  })
}

module.exports = {
  fetchImageCollection : fetchImageCollection,
  saveImageCollection : saveImageCollection
}
