import { ObjectId } from 'mongoose';

export type TAdminActionTypes =
  | 'create_user'
  | 'reset_password'
  | 'change_credit'
  | 'change_status';

export type TAdminAction = {
  user_id: ObjectId | string;
  admin_id: ObjectId | string;
  action: TAdminActionTypes;
  details?: string;
  date: Date;
};
