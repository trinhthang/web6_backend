const imagesModel = require('./imagesModel');

var addImage = (data, callback) => {
  imagesModel.findOne({}).select('id').sort({id : -1})
  .exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      var id;
      if (doc && doc.id) {
        id = doc.id + 1;
      } else {
        id = 1;
      }
      data.id = id;
      imagesModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log(doc);
          callback(null, doc);
        }
      })
    }
  });

}

var getAllImage = (callback) => {
  imagesModel.find({}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

var getImageById = (id,callback) => {
  imagesModel.find({"id" : id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}


var updateImageById = (newData) => {
  imagesModel.findOneAndUpdate({"id" : newData.id}, newData, (err) => {
    if (err){
      console.log(err);
    } else {
      console.log("Changed image's infomation");
    }
  })
}

var deleteImageById = (id) =>{
  imagesModel.remove({"id" : id}, (err) => {
    if (err) {
      console.log(e);
    }
  })
}

var searchImageByName = (name, callback) => {
  imagesModel.find({"name" : {"$regex": name} }, (err, doc) => {
    if (err){
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

module.exports = {
  addImage,
  getAllImage,
  getImageById,
  updateImageById,
  deleteImageById,
  searchImageByName
}
