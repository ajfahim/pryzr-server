import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';

const getAllUsers = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;

  const users = await User.aggregatePaginate(
    User.aggregate([
      {
        $match: {
          role: 'user',
        },
      },
      {
        $project: {
          password_hash: 0,
        },
      },
    ]),
    { limit, page },
  );

  return users;
};

const createNewUser = async (payload: TUser) => {
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

export const AdminServices = {
  getAllUsers,
  createNewUser,
};
