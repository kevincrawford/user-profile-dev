const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleTagSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  articleCount: {
    type: Number,
    default: 0
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article'
    }
  ]
}).index({ description: 'text' });

module.exports = ArticleTag = mongoose.model('article-tag', ArticleTagSchema);
