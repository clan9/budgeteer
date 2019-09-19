const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Do this instead of requiring in User model - works better when using mongoose in a testing env (it's best not to 'require' the same model in multiple files);
const User = mongoose.model('user');

// Puts identifier into cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Pulls identifier out of cookie , relevant finds user and adds to req.user prop
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // fixes heroku proxy issue
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
