const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  jobId: {
    type: String
  },
  jobType: {
    type: String,
    default: 'Full-time'
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'location'
  },
  status: {
    type: String,
    default: 'Draft'
  },
  salaryPeriod: {
    type: String
  },
  salaryAmount: {
    type: String
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

module.exports = Job = mongoose.model('job', JobSchema);
