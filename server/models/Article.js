const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  summary: {
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
  status: {
    type: String,
    default: 'Draft'
  },
  photoURL: {
    type: String
  },
  videoURL: {
    type: String
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article-tag'
    }
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'article-category'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
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
  published: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
}).index({ title: 'text', summary: 'text', rawText: 'text' }, { weights: { title: 3, summary: 2, rawText: 1 } });

module.exports = User = mongoose.model('article', ArticleSchema);
