const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);

    return result;
  } catch (e) {
    return e.message;
  }
};
