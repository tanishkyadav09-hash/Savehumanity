import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    city: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    capacity: {
      type: Number,
      required: [true, 'Event capacity is required'],
    },
    registeredVolunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',
      },
    ],
    registrationCount: {
      type: Number,
      default: 0,
    },
    organizer: {
      type: String,
      default: 'SaveHumanity',
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    category: {
      type: String,
      enum: ['plantation', 'awareness', 'cleanup', 'other'],
      default: 'plantation',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
