const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
const {
  uploadFile,
  getImages,
  storeResponses,
  getResponses,
} = require("../controllers/storeController");
const {authenticateToken} = require("../middleware/tokenMiddleware")
const storeRouter = express.Router();

dotenv.config();

storeRouter.use(express.json());

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage: storage });

//store the image url's
storeRouter.post("/upload", authenticateToken, upload.single("image"), uploadFile);

//get the images url's
storeRouter.post("/get-image", authenticateToken, getImages);

//store responses
storeRouter.post("/store-response", authenticateToken, storeResponses);

// get response
storeRouter.post("/get-response",authenticateToken, getResponses);

module.exports = storeRouter;
