const mongoose = require("mongoose");

const querySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  query: {
    required: true,
    type: String,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  liked: {
    type: [String],
    required : true
  }
});

const QueryModel = mongoose.model("Query", querySchema);
module.exports = QueryModel;

// $push: { queryList: query }
