import { ObjectId } from 'mongoose';

export type TAdminActionTypes =
  | 'create_user'
  | 'reset_password'
  | 'change_credit'
  | 'restrict_user';

export type TAdminAction = {
  user_id: ObjectId;
  action: TAdminAction;
  details: string;
  date: Date;
};
