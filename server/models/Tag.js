const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  questionCount: {
    type: Number
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'question'
    }
  ]
}).index({ description: 'text' });

module.exports = Tag = mongoose.model('tag', TagSchema);
