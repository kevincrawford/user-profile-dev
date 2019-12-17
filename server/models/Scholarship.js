const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  slug: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  summary: {
    type: String
  },
  isSped: {
    type: Boolean
  },
  active: {
    type: Boolean
  },
  url: {
    type: String
  },
  open: {
    type: Date,
    default: Date.now
  },
  closed: {
    type: Date,
    default: Date.now
  },
  announced: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tag = mongoose.model('scholarship', ScholarshipSchema);
