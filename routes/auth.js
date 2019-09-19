const passport = require('passport');
const express = require('express');

const router = express.Router();

// @route   GET /auth/google
// @desc    start login with oauth
// @access  Public
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dash');
});

// req.logout is provided by passport - when called, req.user is deleted
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// @route   GET /auth/user
// @desc    fetch the current user
// @access  Public
router.get('/user', (req, res) => {
  // use a try catch here
  const user = req.user;

  if (!user) {
    res.status(401).redirect('/');
  }

  res.send(user);
});

module.exports = router;

// *********************************

// INITIAL CODE FOR POSTMAN:
// const express = require('express');
// const User = require('../models/User');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const user = new User();

//     await user.save();
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;
