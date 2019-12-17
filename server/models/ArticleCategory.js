const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleCategorySchema = new Schema({
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

module.exports = ArticleCategory = mongoose.model('article-category', ArticleCategorySchema);
