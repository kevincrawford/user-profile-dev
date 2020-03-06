const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  vid: {
    type: String
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  screenName: {
    type: String,
    unique: true
  },
  title: {
    type: String
  },
  summary: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization'
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'role'
    }
  ],
  reset_password_token: {
    type: String
  },
  stripeId: {
    type: String
  },
  reset_password_expires: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = User = mongoose.model('user', UserSchema);
