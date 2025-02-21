const QueryModel = require("../models/query");
const ReplyModel = require("../models/reply");

const create_query = async (req, res) => {
  try {
    const { name, phone } = req.user;
    const { query } = req.body;

    //checks if user has entered name and query fields or not
    if (!name || !query || !phone) {
      return res.status(400).json({
        success: false,
        message: "Empty Details Found",
      });
    }

    const count = await QueryModel.countDocuments({ name, phone });

    //checks if user has created more than 3 queries or not
    if (count >= 1) {
      return res.status(400).json({
        success: false,
        message: "Query Limit Reached",
      });
    }

    //create a new query by his name
    let queryBody = new QueryModel({
      name,
      phone,
      query,
      upvote: 0,
      liked: [],
    });

    await queryBody.save();

    return res.status(200).json({
      success: true,
      message: "Query Created",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const reply = async (req, res) => {
  try {
    //name,phone is of the query in which we post the reply
    //reply_name,reply is the name of person and his reply who is replying to the query
    const { name1, phone1, reply } = req.body;
    let { name } = req.user;
    reply_name = name;

    name = name1;
    const phone = phone1;
    // find the query in which we want to add query
    const reply_body = await ReplyModel.findOneAndUpdate(
      { name, phone },
      {
        $push: {
          replies: {
            userName: reply_name,
            reply,
          },
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Reply added",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const get_query = async (req, res) => {
  try {
    const body = await QueryModel.find().sort({ upvote: -1 });

    return res.status(200).json({
      success: true,
      message: body,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const edit_query = async (req, res) => {
  try {
    const { name, phone } = req.user;
    const { query } = req.body;

    const body = await QueryModel.findOneAndUpdate(
      { name, phone },
      { query },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: body,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const delete_query = async (req, res) => {
  try {
    const { name, phone } = req.user;

    await QueryModel.findOneAndDelete({ name, phone });
    await ReplyModel.findOneAndDelete({ name, phone });

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const get_reply = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const body = await ReplyModel.findOne({ name, phone });

    if (!body) {
      return res.status(400).json({
        success: true,
        message: "No Reply Exist!!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: body["replies"],
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const edit_reply = async (req, res) => {
  try {
    const { name, phone } = req.user;
    const { query, new_query } = req.body;

    const body = await ReplyModel.findOne({ name, phone });
    const reply_list = body["replies"];

    const matchedReplies = reply_list.filter((item) =>
      item.reply.includes(query)
    );

    //without g it only replaces the first occurrence in the matchedReplies list
    matchedReplies.forEach((item) => {
      item.reply = item.reply.replace(new RegExp(query, "g"), new_query);
    });

    await body.save();

    return res.status(200).json({
      success: true,
      message: "Edited Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const delete_reply = async (req, res) => {
  try {
    const { name, phone, query } = req.body;

    const body = await ReplyModel.findOne({ name, phone });
    //list_replies is not const because "Assignment to constant variable is not allowed.
    let list_replies = body["replies"];

    list_replies = list_replies.filter((item) => !item.reply.includes(query));

    // Update the replies in the database
    body["replies"] = list_replies;
    await body.save();

    await body.save();

    return res.status(200).json({
      success: true,
      message: "Deleted SUccessfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const upvote = async (req, res) => {
  try {
    const { name1, phone1 } = req.body;
    let { name, phone } = req.user;
    replyname = name;
    replyphone = phone;

    name = name1;
    phone = phone1;

    const body = await QueryModel.findOneAndUpdate(
      { name, phone },
      {
        $push: { liked: `${replyname}_${replyphone.substring(0, 3)}` },
        $inc: { upvote: 1 },
      },
      { new: true }
    );

    if (!body) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: body,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const check_liked = async (req, res) => {
  try {
    let{ name, phone } = req.user;
    const checkname = name;
    const checkphone = phone;
    const { queryname, queryphone } = req.body;

    name = queryname;
    phone = queryphone;

    const check = await QueryModel.findOne({ name,phone });

    const isPresent = check.liked.find(
      (item) => item === `${checkname}_${checkphone.substring(0, 3)}`
    );

    if (!isPresent) {
      return res.status(200).json({
        success: true,
        message: "Not Liked",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Liked",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = {
  create_query,
  reply,
  get_query,
  edit_query,
  delete_query,
  get_reply,
  edit_reply,
  delete_reply,
  upvote,
  check_liked,
};
