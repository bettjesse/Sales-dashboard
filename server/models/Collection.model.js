import mongoose from 'mongoose';

const { Schema } = mongoose;

export const CollectionSchema = new Schema({
  invoice: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  collectionNumber: {
    type: String,
    required: true,
  },
  dateOfCollection: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Valid', 'Bounced'],
    default: 'Valid',
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Collection', CollectionSchema);
