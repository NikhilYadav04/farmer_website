const imageModel = require("../models/image");

const uploadFile = async (req, res) => {
  try {
    const { name, phone } = req.user;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No File Uploaded",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "No Name Entered",
      });
    }

    //create a new schema of images if not present or update it with uploaded images
    const body = await imageModel.findOneAndUpdate(
      { name, phone },
      { $push: { images: req.file.path } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
      url: req.file.path,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const getImages = async (req, res) => {
  try {
    const { name, phone } = req.user;

    const body = await imageModel.findOne({ name, phone });

    return res.status(200).json({
      success: true,
      message: body["images"],
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const storeResponses = async (req, res) => {
  try {
    const {name,phone} = req.user;
    const { response } = req.body;

    const body = await imageModel.findOneAndUpdate(
      { name, phone },
      { $push: { responses: response } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: body["responses"],
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const getResponses = async (req, res) => {
  try {
    const { name, phone } = req.user;

    const body = await imageModel.findOne({ name, phone });

    return res.status(200).json({
      success: true,
      message: body["responses"],
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { uploadFile, getImages, storeResponses, getResponses };
