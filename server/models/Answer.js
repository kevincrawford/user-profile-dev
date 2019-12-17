const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question'
  },
  displayName: {
    type: String
  },
  avatar: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  accepted: {
    type: Boolean,
    default: false
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  unlikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
}).index({ content: 'text' });

module.exports = Answer = mongoose.model('answer', AnswerSchema);
