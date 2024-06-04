import mongoose from 'mongoose';

const { Schema } = mongoose;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Primary', 'Secondary', 'IGCSE'],
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
    default: Date.now,
  },
  contactInformation: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  invoices: [{
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
  }],
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  }],
  balance: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('School', SchoolSchema);
