const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  invoice_amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    required: true,
  },
  invoice_date: {
    type: Date,
    required: true,
  },
  invoice_number: {
    type: String,
    required: false,
  },
  service_date: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: 'Unpaid',
  },

  comment: {
    type: String,
    required: false,
  },

  to_pay: {
    type: Boolean,
    required: true,
    default: false,
  },
  reminder: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Invoice = mongoose.model('invoice', invoiceSchema);
module.exports = Invoice;
