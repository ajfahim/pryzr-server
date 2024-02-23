import { Schema, Types, model } from 'mongoose';
import { TGamePlayRecord } from './gameplayRecords.interface';

const gamePlayRecordSchema = new Schema<TGamePlayRecord>({
  user_id: {
    type: Types.ObjectId,
    required: true,
  },
  game_id: {
    type: Types.ObjectId,
    required: true,
  },
  bet_credits: {
    type: Number,
    required: true,
  },
  win_credits: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const GamePlayRecord = model<TGamePlayRecord>(
  'GamePlayRecord',
  gamePlayRecordSchema,
);
