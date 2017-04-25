const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage = (data) => {
  imagesModel.create(data, (err, doc) => {
    if(err){
      console.log(err);
    } else {
      console.log(doc);
    }
  })
}

var getAll = () => {
  try {
      imagesModel.find({});
  } catch (e) {

  }
}

var updateImageCollectionById = (id, newData) => {
  try {
    imagesModel.updateOne(
      { id : id },
      {
        $set : {imageLink : newData.imageLink, description : newData.description}
      }
    )
  } catch (e) {
    console.log(e);
  }
}
var deleteImageCollectionById = (delete_id) => {
  try {
    imagesModel.deleteOne(
      { id : delete_id}
    )
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  addImage,
  getAll,
  updateImageCollectionById,
  deleteImageCollectionById
}
