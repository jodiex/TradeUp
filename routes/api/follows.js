const express = require("express");
const router = express.Router();

const Follow = require("../../models/Follow");
const User = require("../../models/User");

// @route POST api/follows/:username
// @desc Add new follow to user
// @access Public
router.post("/:username", (req, res) => {
  const newFollow = new Follow({
    username: req.params.username,
    name: req.body.name,
    follower: req.body.follower,
    date: req.body.date
  });

  newFollow
    .save()
    .then(follow => res.json(follow))
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

// @route GET api/follows/:username
// @desc Returns whether follower follows user
// @access Public
router.get("/:username", (req, res) => {
  const username = req.params.username;
  const follower = req.query.follower;

  Follow
    .findOne({
      username: username,
      follower: follower
    })
    .then(follow => {
      if (!follow) {
        return res.json({ follow: false });
      }
      return res.json({ follow: true });
    })
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

// @route GET api/follows/:username/followers
// @desc Get all followers of user
// @access Public
router.get("/:username/followers", (req, res) => {
  const username = req.params.username;
  Follow
    .find({ username: username })
    .populate('follower')
    .sort({ date: "desc" })
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      let followers = [];
      for (let d of docs) {
        followers.push({
          username: d.follower.username,
          name: d.follower.name
        })
      }
      return res.status(200).json({
        followers: followers
      });
    })
});

// @route GET api/follows/:username/following
// @desc Get all following of user
// @access Public
router.get("/:username/following", (req, res) => {
  const username = req.params.username;
  User
    .findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      Follow
        .find({ follower: user._id })
        .sort({ date: "desc" })
        .exec((err, docs) => {
          if (err) {
            console.log(err);
            return res.status(500);
          }
          let following = [];
          for (let d of docs) {
            following.push({
              username: d.username,
              name: d.name
            })
          }
          return res.status(200).json({
            following: following
          });
        })
    })
});

// @route DELETE api/follows/:username
// @desc Delete follow by follower
// @access Public
router.delete("/:username", (req, res) => {
  const username = req.params.username;
  const follower = req.query.follower;
 
  Follow
    .deleteMany({
      username: username,
      follower: follower
    })
    .exec((err) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      return res.status(200).json({
        username: username,
        follower: follower
      });
    })
});


module.exports = router;
