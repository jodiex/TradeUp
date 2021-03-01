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


// @route GET api/posts/:username
// @desc Get all posts by username
// @access Public
router.get("/:username", (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    Post
      .find({ username })
      .limit(50)
      .sort({ date: "desc" })
      .exec((err, docs) => {
        if (err) {
          console.log(err);
          return res.status(500);
        }
        let posts = [];
        for (let d of docs) {
          posts.push({
            _id: d._id,
            name: user.name,
            username: d.username,
            tag: d.tag,
            text: d.text,
            date: d.date
          })
        }
        return res.status(200).json({ posts: posts});
      })
  });
});

module.exports = router;
