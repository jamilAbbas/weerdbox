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

// @route Post/api/arts/approve
// @desc approve Arts
// @access private

router.post("/approve", (req, res) => {
  Art.updateOne({ _id: req.body.imageId }, { status: "approved" }).then(art => {
    if (!art) {
      res.json({ updateFailed: "Could Not Update" });
    } else {
      res.json({ updateSuccess: "Sussessfully approved" });
    }
  });
});

// @route Post/api/arts/disapprove
// @desc disapprove Arts
// @access private

router.post("/disapprove", (req, res) => {
  Art.updateOne({ _id: req.body.imageId }, { status: "requested" }).then(
    art => {
      if (!art) {
        res.json({ updateFailed: "Could Not Update" });
      } else {
        res.json({ updateSuccess: "Sussessfully disapproved" });
      }
    }
  );
});

// @route Post/api/arts/delete
// @desc delete Art
// @access private

router.post("/delete", (req, res) => {
  Art.deleteOne({ _id: req.body.imageId }).then(art => {
    if (!art) {
      res.json({ deleteFailed: "Could Not delete the art" });
    } else {
      res.json({ deleteSuccess: "Sussessfully deleted the art" });
    }
  });
});

// @route Post/api/arts/update
// @desc delete Art
// @access private

router.post("/update", (req, res) => {
  let newtags = req.body.tags;
  let tags;
  if (typeof (req.body.tags !== "undefined")) {
    tags = newtags.toString().split(",");
  }
  Art.updateOne(
    { _id: req.body.imageId },
    {
      name: req.body.name !== "undefined" ? req.body.name : "",
      website: req.body.website !== "undefined" ? req.body.website : "",
      phone: req.body.contactEmail !== "undefined" ? req.body.contactEmail : "",
      description:
        req.body.description !== "undefined" ? req.body.description : "",
      tags: newtags,
      art: req.body.art !== "undefined" ? req.body.art : "",
      email: req.body.email !== "undefined" ? req.body.email : ""
    }
  ).then(art => {
    if (!art) {
      res.json({ updateFailed: "Could not update" });
    } else {
      res.json({ updateArtSuccess: "Successfully updated the art" });
    }
  });
});

module.exports = router;
