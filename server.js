const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const likes = require("./routes/api/likes");
const follows = require("./routes/api/follows");
const communityFollows = require("./routes/api/communityFollows");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// db config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/likes", likes);
app.use("/api/follows", follows);
app.use("/api/communities", communityFollows);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port,
    () => console.log(`Server up and running on port ${port} !`));

