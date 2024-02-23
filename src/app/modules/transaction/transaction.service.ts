import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TAction } from '../User/user.interface';
import { User } from '../User/user.model';
import { TTransaction } from './transaction.interface';
import { Transaction } from './transaction.model';

const purchaseCredit = async (user_id: string, payload: TTransaction) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //create new entry to transaction collection
    const transaction = { ...payload, user_id, type: 'purchase' };
    const result = await Transaction.create([transaction], { session });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create transaction',
      );
    }

    //create new log to users collection
    const user = await User.findById(user_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const action: TAction = {
      action_type: 'credit_Purchase',
      credits: payload.amount,
      timeStamp: new Date(),
    };
    user.actions.push(action);

    user.profile.credits! += payload.amount;

    await user.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.error(err);
    throw new Error(err);
  }
};

const withdrawCredits = async (user_id: string, payload: TTransaction) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //create new entry to transaction collection
    const transaction = { ...payload, user_id, type: 'withdrawal' };
    const result = await Transaction.create([transaction], { session });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create transaction',
      );
    }

    //create new log to users collection
    const user = await User.findById(user_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const action: TAction = {
      action_type: 'credit_withdrawal',
      credits: payload.amount,
      timeStamp: new Date(),
    };
    user.actions.push(action);

    user.profile.credits! -= payload.amount;

    await user.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.error(err);
    throw new Error(err);
  }
};

const getTransactionsByUserId = async (
  user_id: string,
  query: Record<string, unknown>,
) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  const transactions = await Transaction.find({ user_id }).skip(skip);

  return transactions;
};

export const TransactionServices = {
  purchaseCredit,
  withdrawCredits,
  getTransactionsByUserId,
};
