import mongoose from 'mongoose';

const{Schema} = mongoose
export const InvoiceItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

export const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  }],
  items: [InvoiceItemSchema],
  creationDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
});

export default mongoose.model("Invoice", InvoiceSchema);
