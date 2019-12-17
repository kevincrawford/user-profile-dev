const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationLocationSchema = new Schema({
  isPrimary: {
    type: Boolean,
    default: false
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
});

module.exports = OrganizationLocation = mongoose.model('organizationlocation', OrganizationLocationSchema);
