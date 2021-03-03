const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegistration = require("../../validation/register");
const validateLogin = require("../../validation/login");

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let userAlreadyExists = true;
  // find user by email and username
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      userAlreadyExists = false;
    }
  });
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else if (!userAlreadyExists) {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password1,
        bio: '',
        emojiStatus: 'grinning'
      });
      // hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(error => {
              console.log(error);
              return res.status(500);
            })
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  // find user by username
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ username: "Username not found" });
    }
    // check password matches password in db
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create JWT Payload
        const payload = {
          id: user.id,
          username: user.username
        };
        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
      return res
          .status(400)
          .json({ password: "Incorrect password" });
      }
    });
  });
});

// @route GET api/users/:username
// @desc Find user profile and return it
// @access Public
router.get("/:username", (req, res) => {
  // find user by username
  const username = req.params.username;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({
      name: user.name,
      username: user.username,
      bio: user.bio,
      emojiStatus: user.emojiStatus
    });
  });
});

// @route POST api/users/:username
// @desc Set user profile details
// @access Public
router.post("/:username", (req, res) => {
  // find user by username
  const username = req.params.username;
  const newUserProfile = {
    name: req.body.name,
    bio: req.body.bio,
    emojiStatus: req.body.emojiStatus
  };

  User.findOneAndUpdate({ username }, newUserProfile, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    })
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

module.exports = router;
