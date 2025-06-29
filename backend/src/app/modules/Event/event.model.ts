import { Schema, model } from 'mongoose';
import { IEvent } from './event.interface';



const eventSchema = new Schema<IEvent>(
  {
    eventTitle: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [100, 'Event title cannot be more than 100 characters'],
    },
    name: {
      type: String,
      required: [true, 'Creator name is required'],
      trim: true,
    },
    dateTime: {
      type: Date,
      required: [true, 'Event date and time is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    attendeeCount: {
      type: Number,
      default: 0,
      min: [0, 'Attendee count cannot be negative'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
eventSchema.index({ eventTitle: 'text' });

// Index for date filtering
eventSchema.index({ dateTime: 1 });

// Index for user-specific queries
eventSchema.index({ userId: 1 });

const Event = model<IEvent>('Event', eventSchema);

export default Event; 