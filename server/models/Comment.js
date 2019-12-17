const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
}).index({ content: 'text' });

module.exports = Comment = mongoose.model('comment', CommentSchema);
