import { ObjectId } from 'mongoose';

export type TTransaction = {
  user_id: ObjectId;
  type: 'purchase' | 'withdrawal';
  amount: number;
  date: Date;
};
