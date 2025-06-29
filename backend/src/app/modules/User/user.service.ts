import User, { IUser } from './User.model';
import { APPerror } from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDb = async (userData: Partial<IUser>) => {
  const result = await User.create(userData);
  return result;
};

const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    throw new APPerror(httpStatus.NOT_FOUND, 'User not found');
  }
  
  return user;
};

const updateUser = async (userId: string, updateData: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    throw new APPerror(httpStatus.NOT_FOUND, 'User not found');
  }
  
  return user;
};

const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  
  if (!user) {
    throw new APPerror(httpStatus.NOT_FOUND, 'User not found');
  }
  
  return user;
};

export const userService = {
  createUserIntoDb,
  getUserById,
  updateUser,
  deleteUser,
}; 