const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User and Profile Model

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Art = require("../../models/Art");
const Like = require("../../models/Like");

router.get("/test", (req, res) => res.json({ msg: "like Works!" }));

// @route POST/api/arts/
// @desc POST ART
// @access private

router.post("/like", (req, res) => {
  Like.findOne({ imageId: req.body.imageId, userId: req.body.userId }).then(
    like => {
      if (like) {
        return res
          .status(400)
          .json({ imageLiked: "You have already Liked this image" });
      } else {

        let newLike = new Like({
          imageId: req.body.imageId,
          userId: req.body.userId
        });
        newLike.save();
        const filter = { _id: req.body.imageId };
        Art.findOneAndUpdate(filter, { $inc: { likes: 1 } }).then(ar => {
          return res.json({ likedData: ar.likes });
        });
      }
    }
  );
});
module.exports = router;
