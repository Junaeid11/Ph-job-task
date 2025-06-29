/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { IEvent, IEventFilters, ICreateEventData, IUpdateEventData } from './event.interface';
import Event from './event.model';
import { APPerror } from '../../errors/AppError';
import httpStatus from 'http-status';
import queryBuilder from '../../builder/queryBuilder';

const createEvent = async (eventData: ICreateEventData): Promise<IEvent> => {
  const event = await Event.create(eventData);
  return event;
};

const getAllEvents = async (filters: IEventFilters = {}): Promise<IEvent[]> => {
  const { search, filter, sortBy = 'dateTime', sortOrder = 'desc' } = filters;

  // Build query using queryBuilder
  const eventQuery = Event.find();
  const query = new queryBuilder(eventQuery, { search, sortBy, sortOrder });

  // Apply search
  query.search(['eventTitle']);

  // Apply date filtering if specified
  if (filter) {
    const now = new Date();
    let dateFilter: any = {};

    switch (filter) {
      case 'today': {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
        dateFilter = {
          dateTime: {
            $gte: startOfDay,
            $lt: endOfDay
          }
        };
        break;
      }
      case 'currentWeek': {
        const startOfWeek = new Date(now.getTime() - now.getDay() * 24 * 60 * 60 * 1000);
        const endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
        dateFilter = {
          dateTime: {
            $gte: startOfWeek,
            $lt: endOfWeek
          }
        };
        break;
      }
      case 'lastWeek': {
        const startOfLastWeek = new Date(now.getTime() - (now.getDay() + 7) * 24 * 60 * 60 * 1000);
        const endOfLastWeek = new Date(startOfLastWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
        dateFilter = {
          dateTime: {
            $gte: startOfLastWeek,
            $lt: endOfLastWeek
          }
        };
        break;
      }
      case 'currentMonth': {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        dateFilter = {
          dateTime: {
            $gte: startOfMonth,
            $lt: endOfMonth
          }
        };
        break;
      }
      case 'lastMonth': {
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        dateFilter = {
          dateTime: {
            $gte: startOfLastMonth,
            $lt: endOfLastMonth
          }
        };
        break;
      }
    }

    // Apply date filter
    if (Object.keys(dateFilter).length > 0) {
      query.modelQuery = query.modelQuery.find(dateFilter);
    }
  }

  // Apply sorting
  const sortField = sortBy || 'dateTime';
  const sortDirection = sortOrder === 'desc' ? '-' : '';
  query.modelQuery = query.modelQuery.sort(`${sortDirection}${sortField}`);

  // Execute query with population
  const events = await query.modelQuery
    .populate('userId', 'name email photoURL')
    .lean() as unknown as IEvent[];

  return events;
};

const getEventById = async (eventId: string): Promise<IEvent> => {
  const event = await Event.findById(eventId)
    .populate('userId', 'name email photoURL')
    .populate('attendees', 'name email photoURL');

  if (!event) {
    throw new APPerror(httpStatus.NOT_FOUND, 'Event not found');
  }

  return event;
};

const getMyEvents = async (userId: string): Promise<IEvent[]> => {
  const events = await Event.find({ userId: new Types.ObjectId(userId) })
    .sort({ dateTime: -1 })
    .populate('userId', 'name email photoURL')
    .lean();

  return events;
};

const updateEvent = async (
  eventId: string,
  userId: string,
  updateData: IUpdateEventData
): Promise<IEvent> => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new APPerror(httpStatus.NOT_FOUND, 'Event not found');
  }
  // console.log('Event Owner:', event.userId.toString());
  // console.log('Current User:', userId);


  if (event.userId.toString() !== userId.toString()) {
    throw new APPerror(httpStatus.FORBIDDEN, 'You are not authorized to update this event');
  }


  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    updateData,
    { new: true, runValidators: true }
  ).populate('userId', 'name email photoURL');

  return updatedEvent!;
};

const deleteEvent = async (eventId: string, userId: string): Promise<void> => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new APPerror(httpStatus.NOT_FOUND, 'Event not found');
  }

  if (event.userId.toString() !== userId.toString()) {
    throw new APPerror(httpStatus.FORBIDDEN, 'You are not authorized to delete this event');
  }

  await Event.findByIdAndDelete(eventId);
};

const joinEvent = async (eventId: string, userId: string): Promise<IEvent> => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new APPerror(httpStatus.NOT_FOUND, 'Event not found');
  }

  // Check if user is already attending
  if (event.attendees.includes(new Types.ObjectId(userId))) {
    throw new APPerror(httpStatus.BAD_REQUEST, 'You are already attending this event');
  }

  // Check if user is the creator
  if (event.userId.toString() === userId) {
    throw new APPerror(httpStatus.BAD_REQUEST, 'You cannot join your own event');
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      $push: { attendees: userId },
      $inc: { attendeeCount: 1 }
    },
    { new: true, runValidators: true }
  ).populate('userId', 'name email photoURL')
    .populate('attendees', 'name email photoURL');

  return updatedEvent!;
};

const leaveEvent = async (eventId: string, userId: string): Promise<IEvent> => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new APPerror(httpStatus.NOT_FOUND, 'Event not found');
  }

  // Check if user is attending
  if (!event.attendees.includes(new Types.ObjectId(userId))) {
    throw new APPerror(httpStatus.BAD_REQUEST, 'You are not attending this event');
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      $pull: { attendees: userId },
      $inc: { attendeeCount: -1 }
    },
    { new: true, runValidators: true }
  ).populate('userId', 'name email photoURL')
    .populate('attendees', 'name email photoURL');

  return updatedEvent!;
};

export const EventService = {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
}; 