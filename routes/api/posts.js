const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");
const User = require("../../models/User");

// @route POST api/posts
// @desc Add new post
// @access Public
router.post("/", (req, res) => {
  const username = req.body.username;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const newPost = new Post({
      username: req.body.username,
      tag: req.body.tag,
      text: req.body.text,
      date: req.body.date,
    });
  
    newPost
      .save()
      .then(post => res.json(post))
      .catch(error => {
        console.log(error);
        return res.status(500);
      })
  });
});

module.exports = router;
