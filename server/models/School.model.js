import mongoose from 'mongoose';

const { Schema } = mongoose;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true,
  },
  contactPhone: {
    type: String,
    required: true,
    unique: true,
  },
  invoices: [{
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
  }],
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('School', SchoolSchema);
