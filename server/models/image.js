const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  images: [String],
  responses: [String],
});

const imageModel = mongoose.model("images", imageSchema);
module.exports = imageModel;
