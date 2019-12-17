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
  address: {
    type: Schema.Types.ObjectId,
    ref: 'address'
  }
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);
