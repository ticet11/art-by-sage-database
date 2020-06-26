const mongoose = require("mongoose");

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageLocation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("GalleryItem", galleryItemSchema);
