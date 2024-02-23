import { ObjectId } from 'mongoose';

export type TGamePlayRecord = {
  user_id: ObjectId;
  game_id: ObjectId;
  bet_credits: number;
  win_credits: number;
  date: Date;
};
