const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const arts = require("./routes/api/arts");
const likes = require("./routes/api/likes");
const passport = require("passport");
const path = require("path");

const app = express();
const db = require("./config/keys").mongoURI;

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to db

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(err));

//User Routes
app.use("/api/users", users);
//Profile Routes
app.use("/api/profile", profile);
//Arts Routes
app.use("/api/arts", arts);
//Likes Route
app.use("/api/likes", likes);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app listenting at port ${port} `));
