const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const expensesRouter = require('./routes/expenses');
const authRouter = require('./routes/auth');
require('./models/User'); // These 2 files in this order
require('./services/passport'); // These 2 files in this order

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const app = express();
app.use(helmet());
app.use(express.json());

//Enable use of cookies in app
app.use(
  cookieSession({
    maxAge: 3 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// setup route handlers
app.use('/api/expenses', expensesRouter);
app.use('/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like main.js or main.css file
  app.use(express.static('client/build'));

  // Express will serve up index.html file
  // if it doesn't recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
