import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import httpStatus from 'http-status';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await authService.getMe(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const authController = {
  registerUser: [validateRequest(AuthValidation.registerSchema), registerUser],
  loginUser: [validateRequest(AuthValidation.loginSchema), loginUser],
  getMe,
};