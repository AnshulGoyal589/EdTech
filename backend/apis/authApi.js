const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');
const passport = require('passport');

const corsOptions = {
  origin: 'http://localhost:3000'
};

// Route to handle user registration
router.get("/",(req,res)=>{
  res.send("jftmvtobkto");
})

router.post("/register", cors(corsOptions), async (req, res) => {
  try {
  console.log('Received a POST request to /register');

  const { username, emailId, password } = req.body;

  console.log(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this username already exists.' });
    }

    const user = new User({
      username: username,
      emailId: emailId
    });

    // Register the user
    const newUser = await User.register(user, password);

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

router.post("/login", cors(corsOptions), (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error. Please try again later.' });
      }

      console.log('Eureka!!');
      return res.status(200).json({ message: 'Login successful.', user });
    });
  })(req, res, next);
});


module.exports = router;
