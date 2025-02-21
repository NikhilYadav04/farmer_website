const validator = require("validator");
const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // if (!validator.isEmail(email)) {
    //   return res.status(400).json({
    //     success: true,
    //     message: "Invalid Email Format!!",
    //   });
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: true,
        message: "User Email already Exists!!",
      });
    }

    const hashPasssword = await bcryptjs.hash(password, 8);
    // 8 is salt rounds number (number of times hashing is done to check)

    //create a new user
    let user = new User({
      email,
      phone,
      password: hashPasssword,
      name,
    });
    user = await user.save();

    return res.status(200).json({
      success: true,
      message: "Account Created SUccessfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let isUser;

    //for email login
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Format!!",
      });
    }

    isUser = await User.findOne({ email }, { name: 1, phone: 1, password: 1 });

    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }

    const isMatch = await bcryptjs.compare(password, isUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email/Password",
      });
    }

    //generate a jwt token
    const jwtToken = await jwt.sign(
      {
        name: isUser.name,
        phone: isUser.phone,
        email: email,
      },
      process.env.JSON_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: jwtToken,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `Error is : ${e.message}`,
    });
  }
};

module.exports = { signup, signin };
