const mongoose = require('mongoose');
const { Schema } = mongoose;
const ExpenseSchema = require('./expenseSchema');

const userSchema = new Schema({
  googleId: String,
  expenses: [ExpenseSchema]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
