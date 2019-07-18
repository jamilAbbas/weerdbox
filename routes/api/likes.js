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
  let newLike = new Like({
    imageId: req.body.imageId,
    userId: req.body.userId
  });
  const filter = { _id: req.body.imageId };
//   let likesOnimage = Art.findOne({ _id: req.body.imageId }).then(
//     art => art.likes
//   );
  const update = { likes: 2 };
  console.log("-----------likes on image-----------");
  console.log(update.likes);
  Art.findOneAndUpdate(filter, update);

  //   Like.findOne({ imageId: req.body.imageId, userId: req.body.userId }).then(
  //     like => {
  //       if (like) {
  //         return res.status(400).json({ imagLiked: "Already Liked this image" });
  //       } else {
  //         let newLike = new Like({
  //           imageId: req.body.imageId,
  //           userId: req.body.userId
  //         });
  //         const filter = { _id: req.body.imageId };
  //         let likesOnimage = Art.findOne({ _id: req.body.imageId }).then(
  //           art => art.likes
  //         );
  //         const update = { likes: likesOnimage + 1 };
  //         console.log("-----------likes on image-----------");
  //         console.log(update.likes);
  //         Art.findOneAndUpdate(filter, update);
  //       }
  //     }
  //   );
});
module.exports = router;
