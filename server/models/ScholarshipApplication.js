const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScholarshipApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  scholarshipName: {
    type: String,
    required: true
  },
  referenceId: {
    type: String
  },
  school: {
    type: String
  },
  graduation: {
    type: String
  },
  essay: {
    type: String
  },
  reviewed: {
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
  likeCount: {
    type: Number
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

module.exports = ScholarshipApplication = mongoose.model('scholarship-application', ScholarshipApplicationSchema);
