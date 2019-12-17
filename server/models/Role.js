const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

module.exports = Role = mongoose.model('role', RoleSchema);
