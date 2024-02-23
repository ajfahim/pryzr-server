import { Schema, Types, model } from 'mongoose';
import { adminActionTypesForModel } from './adminAction.constants';
import { TAdminAction } from './adminAction.interface';

const adminActionSchema = new Schema<TAdminAction>({
  user_id: {
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  },
  action: {
    type: String,
    enum: adminActionTypesForModel,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export const AdminAction = model<TAdminAction>(
  'AdminAction',
  adminActionSchema,
);
