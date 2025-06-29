import { APPerror } from '../../errors/AppError';
import User from '../User/User.model';
import { TLoginUser, TRegisterUser, TJwtPayload } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUser = async (payload: TRegisterUser) => {
  // Check if user already exists
  const existingUser = await User.isUserExists(payload.email);
  if (existingUser) {
    throw new APPerror(httpStatus.CONFLICT, 'User already exists with this email');
  }

  // Create new user
  const user = await User.create(payload);

  // Create JWT payload
  const jwtPayload: TJwtPayload = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  // Create token
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expire_access as string
  );

  // Return user data without password
  const userWithoutPassword = JSON.parse(JSON.stringify(user));
  delete userWithoutPassword.password;

  return {
    user: userWithoutPassword,
    token,
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  
  if (!user) {
    throw new APPerror(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new APPerror(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload: TJwtPayload = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expire_access as string
  );

  // Return user data without password
  const userWithoutPassword = JSON.parse(JSON.stringify(user));
  delete userWithoutPassword.password;

  return {
    user: userWithoutPassword,
    token,
  };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    throw new APPerror(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

export const authService = {
  registerUser,
  loginUser,
  getMe,
};