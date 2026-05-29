const express = require('express');
const router = express.Router();
const { 
  createDonationRequest, 
  getMyDonationRequests, 
  updateDonationStatus 
} = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createDonationRequest);
router.get('/my-requests', protect, getMyDonationRequests);
router.patch('/:id/status', protect, updateDonationStatus);

module.exports = router;