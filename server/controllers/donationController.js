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

const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await DonationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: 'Status updated successfully', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createDonationRequest, 
  getMyDonationRequests, 
  updateDonationStatus 
};