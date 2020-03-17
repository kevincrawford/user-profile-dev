const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./PointSchema');

const JobSchema = new Schema({
  jobId: {
    type: String
  },
  jobType: {
    type: String,
    default: 'Full-time'
  },
  title: {
    type: String
  },
  summary: {
    type: String
  },
  description: {
    type: String
  },
  applyLink: {
    type: String
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization'
  },
  loc: {
    type: pointSchema
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

JobSchema.index({ loc: '2dsphere' });

module.exports = Job = mongoose.model('job', JobSchema);
