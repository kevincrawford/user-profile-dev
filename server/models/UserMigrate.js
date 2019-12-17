const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserMigrateSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  screenName: {
    type: String,
    unique: true
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
  avatar: {
    type: String
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
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
  reset_password_expires: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserMigrateSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = UserMigrate = mongoose.model('usermigrate', UserMigrateSchema);
