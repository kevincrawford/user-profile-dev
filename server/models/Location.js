const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./PointSchema');

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization'
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  loc: {
    type: pointSchema
  }
});

module.exports = Location = mongoose.model('location', LocationSchema);
