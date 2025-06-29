/* eslint-disable no-unused-vars */
import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

export interface IUser {
  _id: string
  name: string;
  email: string;
  password: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserStatics {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  isUserExists(email: string): Promise<IUser | null>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser> & IUserStatics;

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    photoURL: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Pre save middleware/hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Static method to check if user exists
userSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await User.findOne({ email });
  return existingUser;
};

// Static method to check if password matches
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

const User = model<IUser, UserModel>('User', userSchema);

export default User; 