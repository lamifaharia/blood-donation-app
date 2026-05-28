const DonationRequest = require('../models/DonationRequest');

const createDonationRequest = async (req, res) => {
  try {
    const newRequest = await DonationRequest.create(req.body);
    res.status(201).json({ 
      message: 'Donation request created successfully', 
      request: newRequest 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyDonationRequests = async (req, res) => {
  try {
    const requests = await DonationRequest.find({ requesterEmail: req.user.email });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDonationRequest, getMyDonationRequests };