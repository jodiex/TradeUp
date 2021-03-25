const express = require("express");
const router = express.Router();

const CommunityFollow = require("../../models/CommunityFollow");

// @route POST api/communities/follow/:name
// @desc Add new follow to community
// @access Public
router.post("/follow/:name", (req, res) => {
  const newCommunityFollow = new CommunityFollow({
    name: req.params.name,
    follower: req.body.follower,
    date: req.body.date
  });

  newCommunityFollow
    .save()
    .then(follow => res.json(follow))
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

// @route GET api/communities/follow/:name
// @desc Returns whether user follows community
// @access Public
router.get("/follow/:name", (req, res) => {
  const name = req.params.name;
  const follower = req.query.follower;

  CommunityFollow
    .findOne({
      name: name,
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

// @route GET api/communities/joined/:username/
// @desc Get all communities the user joined
// @access Public
router.get("/joined/:username/", (req, res) => {
  const username = req.params.username;
  User
    .findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      CommunityFollow
        .find({ follower: user._id })
        .sort({ date: "desc" })
        .exec((err, docs) => {
          if (err) {
            console.log(err);
            return res.status(500);
          }
          let joined = [];
          for (let d of docs) {
            joined.push({
              name: d.name
            })
          }
          return res.status(200).json({
            joined: joined
          });
        })
    })
});

// @route DELETE api/communities/follow/:name
// @desc Delete community follow by follower
// @access Public
router.delete("/follow/:name", (req, res) => {
  const name = req.params.name;
  const follower = req.query.follower;
 
  CommunityFollow
    .deleteMany({
      name: name,
      follower: follower
    })
    .exec((err) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      return res.status(200).json({
        name: name,
        follower: follower
      });
    })
});

// @route GET api/communities/trending
// @desc Get trending (most followed) communities within the last 7 days
// @access Public
router.get("/trending", (req, res) => {
  var d = new Date();
  d.setDate(d.getDate()-7);

  CommunityFollow.aggregate([
    {
      $match: {
        date: {
          $gte: d
        }
      }
    },
    {
      $group: {
        _id: '$name',
        count: { $sum: 1 }
      }
    }
  ])
  .sort({ count: "desc" })
  .limit(10)
  .exec((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    var communities = docs.map(doc => {
      return doc.name;
    })
    return res.status(200).json({ communities: communities });
  })
});

module.exports = router;
