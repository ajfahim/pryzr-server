import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { TAction } from '../User/user.interface';
import { User } from '../User/user.model';
import { GamePlayRecord } from '../gameplayRecords/gamePlayRecords.model';
import { TGamePlayRecord } from '../gameplayRecords/gameplayRecords.interface';
import { TGames } from './games.interface';
import { Games } from './games.model';

const createGame = async (payload: TGames, _id: Types.ObjectId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //create new game
    const newGame = await Games.create([payload], { session });
    if (!newGame.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create game');
    }

    //log action on user collection
    const user = await User.findById(_id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const action: TAction = {
      action_type: 'enter_game',
      timeStamp: new Date(),
    };

    user.actions.push(action);
    await user.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return newGame;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getGames = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  const games = await Games.find({}).skip(skip);
  return games;
};

const getGameDetails = async (gameId: string) => {
  const game = await Games.findById(gameId);
  return game;
};

const postGamePlay = async (payload: TGamePlayRecord, _id: Types.ObjectId) => {
  try {
    const gamePlayRecordPayload = { ...payload, user_id: _id };

    const newRecord = GamePlayRecord.create(gamePlayRecordPayload);
    return newRecord;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

export const gamesServices = {
  createGame,
  getGames,
  getGameDetails,
  postGamePlay,
};
