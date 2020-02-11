const mongoose = require('mongoose');
// const QuestionSchema = require('./Question');

const QuestionSchema = mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  pronunciation: {
    type: String
  }
});

const SetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'private'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  questions: [QuestionSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('set', SetSchema);
