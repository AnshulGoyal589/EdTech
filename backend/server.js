const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const colors = require("colors");
const PORT = 8000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/User");
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/insta")
  .then(() => console.log("DB connected successfully".yellow))
  .catch((err) => console.error(err));

const sessionConfig = {
  secret: 'weneedagoodsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 
  }
}

const authApi = require('./apis/authApi');

app.use(bodyParser.json()); 
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('keyboardcat'));
app.use(session(sessionConfig));

// Initialize Passport after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use the authApi
app.use('/auth', authApi);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`.red);
});
