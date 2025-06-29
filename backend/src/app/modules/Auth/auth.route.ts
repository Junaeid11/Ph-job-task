import express from 'express';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected routes
router.get('/me', auth(), authController.getMe);

export const AuthRouter = router;