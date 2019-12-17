const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  uid: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rawText: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag'
    }
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'answer'
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
}).index({ uid: 'text', slug: 'text', title: 'text', content: 'text', rawText: 'text' });

module.exports = Question = mongoose.model('question', QuestionSchema);
