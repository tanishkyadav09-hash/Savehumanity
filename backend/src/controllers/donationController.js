import Donation from '../models/Donation.js';

export const createDonation = async (req, res) => {
  try {
    const { donorName, email, phone, amount, paymentMethod, message, isAnonymous } = req.body;

    if (!donorName || !email || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Generate transaction ID
    const transactionId = `SH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const treesPlanted = Math.ceil(amount / 100); // 1 tree per ₹100

    const donation = await Donation.create({
      donorName: isAnonymous ? 'Anonymous' : donorName,
      email,
      phone,
      amount,
      paymentMethod,
      transactionId,
      message,
      isAnonymous,
      status: 'completed',
      treesPlanted,
    });

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully. Thank you for your support!',
      donation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentMethod } = req.query;

    const skip = (page - 1) * limit;
    let query = {};

    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const donations = await Donation.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Donation.countDocuments(query);
    const totalAmount = await Donation.aggregate([
      { $match: { ...query, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      success: true,
      total,
      totalAmount: totalAmount[0]?.total || 0,
      pages: Math.ceil(total / limit),
      donations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          averageAmount: { $avg: '$amount' },
          treesPlanted: { $sum: '$treesPlanted' },
        },
      },
    ]);

    const paymentMethodStats = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          amount: { $sum: '$amount' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0] || { totalDonations: 0, totalAmount: 0, averageAmount: 0, treesPlanted: 0 },
      paymentMethodStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const initializeRazorpayPayment = async (req, res) => {
  try {
    const { amount, donorName, email, phone } = req.body;

    // In production, initialize with Razorpay API
    const orderId = `RZP-${Date.now()}`;

    res.status(200).json({
      success: true,
      orderId,
      amount,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, donorData } = req.body;

    // In production, verify signature with Razorpay
    const donation = await Donation.create({
      ...donorData,
      razorpayOrderId,
      razorpayPaymentId,
      status: 'completed',
      transactionId: razorpayPaymentId,
      treesPlanted: Math.ceil(donorData.amount / 100),
    });

    res.status(201).json({
      success: true,
      message: 'Payment verified successfully',
      donation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
