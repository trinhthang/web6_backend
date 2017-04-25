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

var read = () => {
  try {
      imagesModel.find({});
  } catch (e) {
      console.log(e);
  }
}

var readById = (search_id) => {
  try {
    imagesModel.find({id: search_id});
  } catch (e) {
      console.log(e);
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
    if (delete_id > 0 && delete_id <= imagesModel.length){
      imagesModel.deleteOne(
        { id : delete_id},
        (err, doc) => {
          if(err) console.log(e);
          else console.log(doc);
        }
      )
    } else res.send("invalid id")
}

module.exports = {
  addImage,
  read,
  readById,
  updateImageCollectionById,
  deleteImageCollectionById
}
