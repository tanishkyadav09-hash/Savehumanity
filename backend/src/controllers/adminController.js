import Settings from '../models/Settings.js';
import Volunteer from '../models/Volunteer.js';
import Donation from '../models/Donation.js';
import Event from '../models/Event.js';
import Project from '../models/Project.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      Volunteer.countDocuments({ status: 'approved' }),
      Donation.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Event.countDocuments({ status: { $in: ['upcoming', 'ongoing'] } }),
      Project.countDocuments(),
      Donation.countDocuments({ status: 'completed' }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        activeVolunteers: stats[0],
        totalDonations: stats[1][0]?.total || 0,
        upcomingEvents: stats[2],
        totalProjects: stats[3],
        totalTransactions: stats[4],
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide key and value' });
    }

    const setting = await Settings.findOneAndUpdate(
      { key },
      {
        key,
        value,
        updatedBy: req.userId,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Setting updated successfully',
      setting,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();

    const settingsObject = {};
    settings.forEach((setting) => {
      settingsObject[setting.key] = setting.value;
    });

    res.status(200).json({
      success: true,
      settings: settingsObject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateImpactCounters = async (req, res) => {
  try {
    const { treesPlanted, activeVolunteers, citiesCovered } = req.body;

    const updates = [];

    if (treesPlanted !== undefined) {
      updates.push(
        Settings.findOneAndUpdate(
          { key: 'treesPlanted' },
          { key: 'treesPlanted', value: treesPlanted, updatedBy: req.userId },
          { upsert: true }
        )
      );
    }

    if (activeVolunteers !== undefined) {
      updates.push(
        Settings.findOneAndUpdate(
          { key: 'activeVolunteers' },
          { key: 'activeVolunteers', value: activeVolunteers, updatedBy: req.userId },
          { upsert: true }
        )
      );
    }

    if (citiesCovered !== undefined) {
      updates.push(
        Settings.findOneAndUpdate(
          { key: 'citiesCovered' },
          { key: 'citiesCovered', value: citiesCovered, updatedBy: req.userId },
          { upsert: true }
        )
      );
    }

    await Promise.all(updates);

    res.status(200).json({
      success: true,
      message: 'Impact counters updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const donationData = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          amount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);

    const volunteerTrend = await Volunteer.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        donations: donationData,
        volunteers: volunteerTrend,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
