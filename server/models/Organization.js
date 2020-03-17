const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./PointSchema');

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'trial'
  },
  summary: {
    type: String
  },
  description: {
    type: String
  },
  website: {
    type: String
  },
  domain: {
    type: String,
    required: true,
    unique: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  loc: {
    type: pointSchema
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'location'
  },
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'location'
    }
  ],
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'job'
    }
  ]
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);
