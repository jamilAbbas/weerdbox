const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const arts = require("./routes/api/arts");
const likes = require("./routes/api/likes");
const passport = require("passport");

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
  .connect(
    "mongodb+srv://wbadmin:815mjdbn@cluster0-x3q7y.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
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

app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.port || 8000;
app.listen(port, () => console.log(`app listenting at port ${port} `));
