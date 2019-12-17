const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

const DocumentSchema = new Schema(
  {
    document_id: { type: Number, default: 0 },
    description: { type: String },
    link: { type: String },
    url: { type: String },
    key: { type: String }
  },
  {
    timestamps: true
  }
);

DocumentSchema.plugin(AutoIncrement, { inc_field: 'document_id' });

module.exports = Document = mongoose.model('document', DocumentSchema);
