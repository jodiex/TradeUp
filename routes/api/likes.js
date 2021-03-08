const express = require("express");
const router = express.Router();

const Like = require("../../models/Like");
const Post = require("../../models/Post");

// @route POST api/likes/
// @desc Add new like to post
// @access Public
router.post("/", (req, res) => {
  const newLike = new Like({
    post: req.body.post,
    likedBy: req.body.likedBy,
    date: req.body.date
  });

  newLike
    .save()
    .then(like => res.json(like))
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

// @route GET api/likes/:username
// @desc Get all posts liked by username
// @access Public
router.get("/:username", (req, res) => {
  const username = req.params.username;
  Like
    .find({ likedBy: username })
    .populate('post')
    .sort({ date: "desc" })
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      let likes = [];
      let posts = [];
      for (let d of docs) {
        likes.push(d.post._id);
        posts.push({
          _id: d.post._id,
          username: d.post.username,
          author: d.post.author,
          authorName: d.post.authorName,
          tag: d.post.tag,
          text: d.post.text,
          date: d.post.date,
          reshared: d.post.reshared
        })
      }
      return res.status(200).json({
        likes: likes,
        posts: posts
      });
    })
});

// @route DELETE api/likes/:username
// @desc Delete like by username on post
// @access Public
router.delete("/:username", (req, res) => {
  const username = req.params.username;
  const post_id = req.query.post;
 
  Like
    .deleteMany({
      post: post_id,
      likedBy: username
    })
    .exec((err) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      return res.status(200).json({
        post: post_id,
        likedBy: username
      });
    })
});


module.exports = router;
