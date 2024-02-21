/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

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

export const UserServices = {
  register,
};
