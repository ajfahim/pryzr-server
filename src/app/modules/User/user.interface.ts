/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TProfile = {
  name: string;
  credits: number;
  reset_password_token: string;
  reset_password_expires: Date;
  status: 'active' | 'blocked';
};

export type TAction = {
  action_type: 'credit_Purchase' | 'credit_withdrawal' | 'enter_game';
  credits?: number;
  timeStamp: Date;
};
export interface TUser {
  email: string;
  userName: string;
  password_hash: string;
  role: 'admin' | 'user';
  last_login: Date;
  profile: TProfile;
  actions: TAction[];
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
