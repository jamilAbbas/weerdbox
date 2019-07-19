const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User and Profile Model

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Art = require("../../models/Art");

// @route GET/api/arts/test
// @desc test user
// @access public
router.get("/test", (req, res) => res.json({ msg: "arts Works!" }));

// @route POST/api/arts/
// @desc POST ART
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("tags request body-----");
    console.log(req.body.tags);
    let tags;
    if (typeof (req.body.tags !== "undefined")) {
      tags = req.body.tags.split(",");
    }

    let newArt = new Art({
      name: req.body.name,
      website: req.body.website,
      phone: req.body.phone,
      description: req.body.description,
      tags: tags,
      art: req.body.art,
      email: req.body.email
    });
    newArt.save().then(art => {
      return res.json({ newart: art });
    });
  }
);

// @route GET/api/arts/all
// @desc Get all arts
// @access public

router.get("/all", (req, res) => {
  const arts = Art.find()
    // .populate("user", ["id", "fullname", "email"])
    .then(arts => {
      if (!arts) {
        return res.status(404).send({ noarts: "There are no arts" });
      }
      res.json(arts);
    });
});

// @route Post/api/arts/myarts
// @desc Get all arts of a user
// @access private

router.post("/myarts", (req, res) => {
  console.log("---myarts api", req.body);
  const arts = Art.find({ email: req.body.email }).then(arts => {
    if (!arts) {
      return res.status(404).send({ notfound: "No Arts found for this user" });
    }
    res.json(arts);
  });
});

// @route Post/api/arts/myarts
// @desc Get all arts of a user
// @access private

router.post("/myarts", (req, res) => {
  console.log("---myarts api", req.body);
  const arts = Art.find({ email: req.body.email }).then(arts => {
    if (!arts) {
      return res.status(404).send({ notfound: "No Arts found for this user" });
    }
    res.json(arts);
  });
});

// @route Post/api/arts/search
// @desc Search Arts
// @access public

router.post("/search", (req, res) => {
  const searchResult = Art.find({
    tags: { $regex: req.body.searchQuery, $options: "$i" }
  }).then(arts => {
    if (!arts) {
      return res.status(404).send({ noSearchResult: "No results found" });
    } else {
      res.json(arts);
    }
  });
});

module.exports = router;
