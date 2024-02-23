import { Schema, Types, model } from 'mongoose';
import { TTransaction } from './transaction.interface';

const transactionSchema = new Schema<TTransaction>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    type: {
      type: String,
      enum: ['withdrawal', 'purchase'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

export const Transaction = model<TTransaction>(
  'Transaction',
  transactionSchema,
);
