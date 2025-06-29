import express from 'express';
import { EventController } from './event.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', EventController.getAllEvents);
router.get('/:eventId', EventController.getEventById);

// Protected routes
router.use(auth()); // Apply authentication middleware to all routes below

router.post('/', EventController.createEvent);
router.get('/my/events', EventController.getMyEvents);
router.patch('/:eventId', EventController.updateEvent);
router.delete('/:eventId', EventController.deleteEvent);
router.post('/:eventId/join', EventController.joinEvent);
router.post('/:eventId/leave', EventController.leaveEvent);

export default router; 