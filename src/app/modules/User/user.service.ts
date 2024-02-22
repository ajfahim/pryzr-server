/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { Types } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';

const register = async (payload: TUser) => {
  const existingUserName = await User.findOne({ userName: payload.userName });
  const existingEmail = await User.findOne({ email: payload.email });

  if (existingEmail || existingUserName) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A user with same userName or email already exist',
    );
  }

  const userInfo = { ...payload, password_hash: payload.password_hash };
  const newUser = await User.create(userInfo);
  return newUser;
};

const login = async (payload: { email: string; password_hash: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not Found');
  }

  if (user.profile.status !== 'active') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is not active');
  }

  const passwordMatched = User.isPasswordMatched(
    payload.password_hash,
    user.password_hash,
  );
  if (!passwordMatched) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Email or Password Does not match',
    );
  }
  const jwtPayload = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return { accessToken };
};

const getProfile = async (_id: Types.ObjectId) => {
  const user = await User.findById(_id);

  return user?.profile;
};

export const UserServices = {
  register,
  login,
  getProfile,
};
