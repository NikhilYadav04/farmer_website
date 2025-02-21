const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
  userName: {
    required: true,
    type: String,
  },
  reply: {
    required: true,
    type: String,
  },
});

const ReplySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  replies: {
    required: true,
    type: [replySchema],
  },
});

const ReplyModel = mongoose.model("Reply", ReplySchema);
module.exports = ReplyModel;
