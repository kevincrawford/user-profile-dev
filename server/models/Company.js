const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: string
  },
  size: {
    type: string
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  location: {
    type: Schema.Types.ObjectId,
    ref: 'location'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'organization'
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'organization'
    }
  ]
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);
