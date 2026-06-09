import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, city, capacity, category } = req.body;

    if (!title || !description || !date || !location || !city || !capacity) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      city,
      capacity,
      category: category || 'plantation',
      status: 'upcoming',
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { status = 'upcoming', page = 1, limit = 10, city } = req.query;

    const skip = (page - 1) * limit;
    let query = { status };

    if (city) query.city = city;

    const events = await Event.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: 1 });

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('registeredVolunteers');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const eventId = req.params.id;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $addToSet: { registeredVolunteers: volunteerId },
        $inc: { registrationCount: 1 },
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Registered for event successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
