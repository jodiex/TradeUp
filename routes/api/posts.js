const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");
const Like = require("../../models/Like");

// @route POST api/posts
// @desc Add new post
// @access Public
router.post("/", (req, res) => {
  const newPost = new Post({
    username: req.body.username,
    author: req.body.author,
    authorName: req.body.authorName,
    tag: req.body.tag,
    text: req.body.text,
    date: req.body.date,
    reshared: req.body.reshared
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

// @route GET api/posts/user/:username
// @desc Get all posts by username
// @access Public
router.get("/user/:username", (req, res) => {
  const username = req.params.username;
    
  Post
    .find({ username })
    .sort({ date: "desc" })
    .limit(50)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      let posts = [];
      for (let d of docs) {
        posts.push({
          _id: d._id,
          username: d.username,
          author: d.author,
          authorName: d.authorName,
          tag: d.tag,
          text: d.text,
          date: d.date,
          reshared: d.reshared
        });
      }
      return res.status(200).json({ posts: posts });
    })
});

// @route GET api/posts/trending
// @desc Get trending (most liked) posts within the last 7 days
// @access Public
router.get("/trending", (req, res) => {
  var d = new Date();
  d.setDate(d.getDate()-7);

  Like.aggregate([
    {
      $match: {
        date: {
          $gte: d
        }
      }
    },
    {
      $group: {
        _id: '$post',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "post"
      }
    }
  ])
  .sort({ count: "desc" })
  .limit(50)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    var posts = docs.map(doc => {
      if (doc.post && doc.post.length > 0) {
        return doc.post[0]
      }
      // there shouldn't be null posts
      return null;
    })
    posts = posts.filter(post => post !== null);
    return res.status(200).json({ posts: posts });
  })
});


// @route GET api/posts/feed
// @desc Get the posts for a user's feed (from a following list)
// @access Public
router.get("/feed", (req, res) => {
  var following = req.query.following ? req.query.following : [];
  Post
    .find({username: {$in: following }})
    .sort({ date: "desc" })
    .limit(50)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      return res.status(200).json({ posts: docs });
    })
});

module.exports = router;
