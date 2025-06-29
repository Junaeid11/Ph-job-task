import { Request, Response, NextFunction } from 'express';
import { EventService } from './event.service';
import { EventValidation } from './event.validation';
import validateRequest from '../../middlewares/validateRequest';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { IEventFilters } from './event.interface';

const createEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { eventTitle, dateTime, location, description } = req.body;
  const userId = req.user?.id;
  const name = req.user?.name;

  if (!userId || !name) {
    return next(new Error('User not authenticated'));
  }

  const eventData = {
    eventTitle,
    dateTime: new Date(dateTime),
    location,
    description,
    userId,
    name,
  };

  const result = await EventService.createEvent(eventData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const { search, filter, sortBy, sortOrder } = req.query;
  
  const filters: IEventFilters = {
    search: search as string,
    filter: filter as IEventFilters['filter'],
    sortBy: (sortBy as string) === 'dateTime' ? 'dateTime' : 'dateTime',
    sortOrder: sortOrder as 'asc' | 'desc',
  };

  const result = await EventService.getAllEvents(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

const getEventById = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const result = await EventService.getEventById(eventId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});

const getMyEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  if (!userId) {
    return next(new Error('User not authenticated'));
  }

  const result = await EventService.getMyEvents(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My events retrieved successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;
  const updateData = req.body;
  const userId = req.user?.id;
 
  if (!userId) {
    return next(new Error('User not authenticated'));
  }

  const result = await EventService.updateEvent(eventId, userId, updateData);
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return next(new Error('User not authenticated'));
  }

  await EventService.deleteEvent(eventId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: null,
  });
});

const joinEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return next(new Error('User not authenticated'));
  }

  const result = await EventService.joinEvent(eventId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully joined the event',
    data: result,
  });
});

const leaveEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return next(new Error('User not authenticated'));
  }

  const result = await EventService.leaveEvent(eventId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully left the event',
    data: result,
  });
});

export const EventController = {
  createEvent: [validateRequest(EventValidation.createEventSchema), createEvent],
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent: [validateRequest(EventValidation.updateEventSchema), updateEvent],
  deleteEvent,
  joinEvent,
  leaveEvent,
}; 