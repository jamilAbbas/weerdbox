const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import key
const keys = require("../../config/keys");
//Load User model
const User = require("../../models/User");

// @route GET/api/users/test
// @desc test user
// @access public
router.get("/test", (req, res) => res.json({ msg: "User Works!" }));

// @route GET/api/users/register
// @desc register user
// @access public
router.post("/register", (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      let newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,

        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET/api/users/login
// @desc login user
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          fullname: user.fullname,
          email: user.email
        }; // Create JWT Payload
        // Sign Token
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "password inncorrect" });
      }
    });
  });
});

// @route GET/api/users/current
// @desc get current user
// @access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      fullname: req.user.fullname,
      email: req.user.email
    });
  }
);

module.exports = router;
