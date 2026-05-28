const mongoose = require('mongoose');

const donationRequestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  requesterEmail: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientDistrict: { type: String, required: true },
  recipientUpazila: { type: String, required: true },
  hospitalName: { type: String, required: true },
  fullAddress: { type: String },
  bloodGroup: { 
    type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  donationDate: { type: String, required: true },
  donationTime: { type: String, required: true },
  requestMessage: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'done', 'canceled'],
    default: 'pending'
  },
  donorInfo: {
    name: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model('DonationRequest', donationRequestSchema);