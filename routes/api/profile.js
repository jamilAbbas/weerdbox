const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User and Profile Model

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET/api/profile/test
// @desc test user
// @access public
router.get("/test", (req, res) => res.json({ msg: "profile Works!" }));

// @route GET/api/profile
// @desc test user
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user", ["fullname", "email"])
      .then(profile => {
        if (!profile) {
          return res
            .status(404)
            .json({ noprofile: "profile not found for this user" });
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST/api/profile
// @desc create profile
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get fields
    const profileFields = {};
    profileFields.id = req.user.id;
  }
);

module.exports = router;
