const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, JWT Token is required",
    });
  }

  const token = auth.split(" ")[1];
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const authenticateOTPToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, JWT Token is required",
    });
  }

  const token = auth.split(" ")[1];
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET_CODE);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = {authenticateOTPToken,authenticateToken};
