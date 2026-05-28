const express = require('express');
const router = express.Router();
const { createDonationRequest, getMyDonationRequests } = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createDonationRequest);
router.get('/my-requests', protect, getMyDonationRequests);

module.exports = router;