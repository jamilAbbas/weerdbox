const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const nodeMailer = require("nodemailer");
const WEERDBOX = "jamil.abbas813@gmail.com";
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import key
const keys = require("../../config/keys");
// Reset password

router.post("/resetpasswordrequest", function(req, res) {
  User.findOne({ email: req.body.email }).then(email => {
    if (!email) {
      return res.status(404).json({ email: "Email not found" });
    } else {
      const resetPassToken = Math.floor(Math.random() * 888888 + 1);
      User.updateOne(
        { email: req.body.email },
        { resetPassword: resetPassToken }
      ).then(user => {
        if (!user) {
          res.json("could not set token");
        } else {
          let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
              // should be replaced with real sender's account
              user: "weerdbox@gmail.com",
              pass: "getweerd001"
            }
          });
          let mailOptions = {
            // should be replaced with real recipient's account
            from: "WEERDBOX <weerdbox@gmail.com>",
            to: req.body.email,
            subject: "Reset Password",
            html: `<b>Please click the link below to change your password?</b>
              <a href="https://weerdbox.herokuapp.com/reset/${resetPassToken}">
              https://weerdbox.herokuapp.com/reset/${resetPassToken}
              </a>`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message %s sent: %s", info.messageId, info.response);
            res.status(200).json({ emailSuccess: "success fullys sent" });
          });
        }
      });
    }
  });
});

// update password

router.post("/updatepassword", (req, res) => {
  const existingEmail = req.body.existingEmail;
  let newPassword = req.body.newPassword;
  const tokenFromClient = req.body.token;
  User.findOne({ email: existingEmail }).then(user => {
    if (!user) {
      res.status(404).json({ emailDoesNotExist: "Email not found" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          user.password = newPassword;
          user
            .save()
            .then(user =>
              res.json({ passwordUpdated: "Successfully updated password" })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = router;
