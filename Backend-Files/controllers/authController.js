const express = require("express");
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
require("dotenv").config();

//-----------------------------------------------------sigup API Logic--------------------------------------------
const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    university,
    graduationYear,
    password,
    confirmPassword,
    terms,
    newsletter,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !university ||
    !password ||
    !confirmPassword
  ) {
    return res.json({
      success: false,
      message: "Please fill in all fields",
    });
  }

  if (password !== confirmPassword) {
    return res.json({
      success: false,
      message: "password do not match",
    });
  }

  if (!terms) {
    return res.json({
      success: false,
      message: "You must have to accept the terms and conditions",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await user.findOne({ email });
    const newsletterBoolean = newsletter === "on" ? true : false;

    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email is already exist",
      });
    }

    // Create new User
    const newUser = new user({
      firstName,
      lastName,
      fullName: firstName + " " + lastName,
      email,
      password,
      university,
      graduationYear,
      newsletter: newsletterBoolean,
    });

    //save user to our database
    await newUser.save();

    console.log("New User:", newUser.firstName);

    res.status(201).json({
      success: true,
      message: `Welcome ${newUser.firstName}!  Registration successful.`,
      user: {
        firstName: newUser.firstName,
        email: newUser.email,
        university: newUser.university,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//-----------------------------------------------------Login API Logic--------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please fill in all fields",
    });
  }
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.json({
        success: false,
        message: "This email user is not exist!!",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // if (password !== existingUser.password) {
    //   return res.json({
    //     success: false,
    //     message: "Password is Wrong!!",
    //   });
    // }
    else {
      console.log("User signin", existingUser.fullName);

      const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        success: true,
        message: `Welcome back, ${existingUser.fullName}!`,
        token: token,
        user: {
          fullname: existingUser.fullName,
          email: existingUser.email,
        },
      });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//-----------------------------------------------------Logout API Logic--------------------------------------------

const logout = (req, res) => {
  const userId = req.user.userId;
  try {
    res.json({
      success: true,
      message: "successfully logout",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " server error",
    });
  }
};

//-----------------------------------------------Forget Password API Logic------------------------------

const forgetPassword = async (req, res) => {
  const { email } = req.body;


  if (!email) {
    return res.status(400).json({
      message: "please provide your email",
    });
  }

  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: false,
      // message: "User Not Found",
    });
  }
  const token = crypto.randomBytes(32).toString('hex');
  const expireTime = Date.now() + 3600000; // 1hr

  existingUser.resetPasswordToken = token;
  existingUser.resetPasswordExpires = expireTime;
  await existingUser.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your app password
    },
  });

  const resetURL = `${process.env.BASE_URL}/reset-password/${token}`;

  // const resetURL = `http://localhost:5000/reset-password/${token}`;

  const mailOptions = {
    from: "EduNest <mr.hvsd01@gmail.com>",
    to: existingUser.email,
    subject: "Reset Your Password",
    html: `<p>Click this link to reset your password:</p>
           <a href="${resetURL}">${resetURL}</a>
           <p>This link expires in 1 hour.</p>`,
  };

  await transporter.sendMail(mailOptions);

  // res.json({ message: 'Reset link sent to your email.' });
  res.json({ message: true });

};

// ----------------------------------reset Password --------------------
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

   if (!password) {
    console.log('newPassword is not found');
    return res.status(400).json({ message: 'New password is required.' });
  }


  try {
    const existingUser = await user.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // Check if token is still valid
    });

    if (!existingUser) {
      return res.status(400).json({ message: 'Token is invalid or has expired.' });
    }

    existingUser.password = password; // Will be hashed in schema
    existingUser.resetPasswordToken = undefined;
    existingUser.resetPasswordExpires = undefined;

    await existingUser.save();

    res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { signup, login, logout, forgetPassword, resetPassword };
