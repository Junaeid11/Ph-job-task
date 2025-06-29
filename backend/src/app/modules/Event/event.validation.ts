import { z } from 'zod';

const createEventSchema = z.object({
  body: z.object({
    eventTitle: z.string({
      required_error: 'Event title is required',
    }).min(1, 'Event title cannot be empty').max(100, 'Event title cannot be more than 100 characters'),
    dateTime: z.string({
      required_error: 'Event date and time is required',
    }).datetime('Invalid date format'),
    location: z.string({
      required_error: 'Event location is required',
    }).min(1, 'Location cannot be empty'),
    description: z.string({
      required_error: 'Event description is required',
    }).min(1, 'Description cannot be empty').max(500, 'Description cannot be more than 500 characters'),
  }),
});

const updateEventSchema = z.object({
  body: z.object({
    eventTitle: z.string().min(1, 'Event title cannot be empty').max(100, 'Event title cannot be more than 100 characters').optional(),
    dateTime: z.string().datetime('Invalid date format').optional(),
    location: z.string().min(1, 'Location cannot be empty').optional(),
    description: z.string().min(1, 'Description cannot be empty').max(500, 'Description cannot be more than 500 characters').optional(),
  }),
});







export const EventValidation = {
  createEventSchema,
  updateEventSchema,
}; 