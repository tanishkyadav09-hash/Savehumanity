import Contact from '../models/Contact.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, phone, category } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      phone,
      category: category || 'inquiry',
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const skip = (page - 1) * limit;
    let query = {};

    if (status) query.status = status;

    const messages = await Contact.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const respondToMessage = async (req, res) => {
  try {
    const { response } = req.body;

    if (!response) {
      return res.status(400).json({ success: false, message: 'Please provide a response' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        adminResponse: response,
        status: 'responded',
        respondedAt: new Date(),
        respondedBy: req.userId,
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Response sent successfully',
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
