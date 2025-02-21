const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otp_generator = require("otp-generator");
const twilioClient = require("../services/twilio_service");
const { mailOptions, transporter } = require("../services/nodemailer_service");

const send_otp = async (req, res) => {
  try {
    const { phone } = req.user;

    const otp = otp_generator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // await twilioClient.messages.create({
    //   body: `Your Otp is : ${otp}`,
    //   to: phone,
    //   from: twilioNumber,
    // });

    console.log(otp);
    const otp_token = await jwt.sign(
      {
        otp,
      },
      process.env.JSON_SECRET_CODE,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: otp_token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const verify_otp = async (req, res) => {
  try {
    const { otp } = req.user;
    const { otp_user } = req.body;

    if (otp != otp_user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect OTP Entered",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const change_password = async (req, res) => {
  try {
    const { phone } = req.user;
    const { password } = req.body;
    const body = await User.findOne({ phone });

    const newPassword = await bcryptjs.hash(password, 8);

    //change password
    body.password = newPassword;
    await body.save();

    return res.status(200).json({
      success: false,
      message: e.message,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const send_link = async (req, res) => {
  try {
    const { name, email } = req.user;

    const sendMail = async () => {
      try {
        const options = mailOptions(
          name,
          email,
          "http://localhost:5173/change-password"
        ); // Pass the sender's email here
        await transporter.sendMail(options);
      } catch (error) {
        console.error(error);
      }
    };

    return res.status(200).json({
      success: true,
      message: "Link sent successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const change_password_email = async (req, res) => {
  try {
    //take email from token and password from user
    const { email } = req.user;
    const { password } = req.body;

    const body = await User.findOne({ email });

    const newPassword = await bcryptjs.hash(password, 8);

    //change password
    body.password = newPassword;
    await body.save();

    //blacklist the token

    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = {
  send_link,
  change_password_email,
  send_otp,
  change_password,
  verify_otp,
};
