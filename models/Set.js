const mongoose = require('mongoose');

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

module.exports = mongoose.model('set', SetSchema);
