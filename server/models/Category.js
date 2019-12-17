const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  questionCount: {
    type: Number,
    default: 0
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'question'
    }
  ]
});

module.exports = Category = mongoose.model('category', CategorySchema);
