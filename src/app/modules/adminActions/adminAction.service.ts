import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { GamePlayRecord } from '../gameplayRecords/gamePlayRecords.model';
import { Transaction } from '../transaction/transaction.model';
import { TAdminAction } from './adminAction.interface';
import { AdminAction } from './adminAction.model';

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

const updateUser = async (_id: string, payload: TUser) => {
  const user = await User.findById(_id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    new Types.ObjectId(_id),
    payload,
    { new: true, upsert: true },
  ).select('-password_hash');

  return updatedUser;
};

const updateCredits = async (
  user_id: string,
  admin_id: string,
  payload: { type: 'purchase' | 'withdrawal'; amount: number },
) => {
  const user = await User.findById(user_id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (payload.type === 'purchase') {
      user.profile.credits! += payload.amount;
      await user.save({ session });
    }

    if (payload.type === 'withdrawal') {
      user.profile.credits! -= payload.amount;
      await user.save({ session });
    }

    const adminActionPayload: TAdminAction = {
      action: 'change_credit',
      user_id,
      admin_id,
      date: new Date(),
      details: `Changed Credit`,
    };

    await AdminAction.create([adminActionPayload], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.error(err);
    throw new Error(err);
  }
};

const updateStatus = async (
  user_id: string,
  admin_id: string,
  payload: { status: 'active' | 'blocked' },
) => {
  const user = await User.findById(user_id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (payload.status === 'active') {
      user.profile.status! = 'active';
      await user.save({ session });
    }

    if (payload.status === 'blocked') {
      user.profile.status! = 'blocked';
      await user.save({ session });
    }

    const adminActionPayload: TAdminAction = {
      action: 'change_status',
      user_id,
      admin_id,
      date: new Date(),
      details: `changed status to ${payload.status}`,
    };

    await AdminAction.create([adminActionPayload], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.error(err);
    throw new Error(err);
  }
};

const getAllTransactions = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  //@ts-expect-error not a error
  const transactions = await Transaction.aggregatePaginate(
    Transaction.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            {
              $project: {
                userName: 1,
                email: 1,
                role: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          user_id: 0,
        },
      },
    ]),
    {
      limit,
      page,
    },
  );

  return transactions;
};
const getGamePlayRecords = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  //@ts-expect-error not a error
  const gamePlay = await GamePlayRecord.aggregatePaginate(
    GamePlayRecord.aggregate([
      {
        $lookup: {
          from: 'games',
          localField: 'game_id',
          foreignField: '_id',
          as: 'game',
          pipeline: [
            {
              $project: {
                name: 1,
                description: 1,
                rtp_percentage: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$game',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            {
              $project: {
                userName: 1,
                email: 1,
                role: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          user_id: 0,
          game_id: 0,
        },
      },
    ]),
    {
      limit,
      page,
    },
  );

  return gamePlay;
};

export const AdminServices = {
  getAllUsers,
  createNewUser,
  updateUser,
  updateCredits,
  updateStatus,
  getAllTransactions,
  getGamePlayRecords,
};
