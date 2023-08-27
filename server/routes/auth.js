const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hello World from the server router js");
});

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(422).json({ error: "Email already exists" });
  } else if (password != cpassword) {
    return res.status(422).json({ error: "Passwords do not match" });
  } else {
    const user = new User({ name, email, password, cpassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials - password" });
      } else {
        const token = await userLogin.generateAuthToken();
        res.cookie("jwt_token", token, {
          expires: new Date(Date.now() + 86400000),
          // httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.status(200).json({ message: "User logged in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials - email" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/auth', authenticate, (req, res) => {
});

router.get('/logout', (req, res) => {
  // console.log('logout');
  res.clearCookie('jwt_token', { path: '/', domain: 'https://notesync-backend.onrender.com' });
  res.status(200).send('User logged out successfully');
})



module.exports = router;
