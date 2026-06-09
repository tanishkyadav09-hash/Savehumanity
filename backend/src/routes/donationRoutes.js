import express from 'express';
import {
  createDonation,
  getAllDonations,
  getDonationStats,
  initializeRazorpayPayment,
  verifyRazorpayPayment,
} from '../controllers/donationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', createDonation);
router.get('/stats', getDonationStats);
router.post('/razorpay/init', initializeRazorpayPayment);
router.post('/razorpay/verify', verifyRazorpayPayment);

// Admin routes
router.get('/', protect, authorize('admin'), getAllDonations);

export default router;
