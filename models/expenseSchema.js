const mongoose = require('mongoose');
// const uuid = require('uuid/v4');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Number,
    default: 0
  }
});

module.exports = expenseSchema;
