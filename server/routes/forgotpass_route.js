const express = require("express");
const { codeValidation } = require("../middleware/authValidations");
const {
  authenticateToken,
  authenticateOTPToken,
} = require("../middleware/tokenMiddleware");
const {
  send_code,
  verify_code,
  change,
} = require("../controllers/authController");
const {
  change_password_phone,
  send_otp,
  change_password_email,
  verify_otp,
  change_password,
  send_link,
} = require("../controllers/forgotpassController");
const authRouter = require("./routes/auth");

//forgot password(phone or email)

//phone
authRouter.post("/send-otp",authenticateToken,send_otp);
authRouter.post(
  "/verify-otp",
  codeValidation,
  authenticateOTPToken,
  verify_otp
);
authRouter.post("/change-password", authenticateToken, change_password);

//email
authRouter.post("/send-link", send_link);
authRouter.post("/change-password", authenticateToken, change_password);


