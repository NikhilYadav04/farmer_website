const express = require("express");
const {
  signUpValidation,
  signInValidation,
} = require("../middleware/authValidations");
const {
  signin,
  signup,
  send_code,
  verify_code,
  change,
} = require("../controllers/authController");
const authRouter = express.Router();

//Sign up
authRouter.post("/signup", signUpValidation, signup);

//Sign In
authRouter.post("/signin", signInValidation, signin);

module.exports = authRouter;
