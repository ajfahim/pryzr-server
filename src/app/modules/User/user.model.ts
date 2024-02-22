/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TAction, TProfile, TUser, UserModel } from './user.interface';

const profileSchema = new Schema<TProfile>({
  name: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  reset_password_expires: {
    type: Date,
  },
  reset_password_token: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

const actionSchema = new Schema<TAction>(
  {
    action_type: {
      type: String,
      enum: ['credit_Purchase', 'credit_withdrawal', 'enter_game'],
    },
    credits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
      select: 0,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    last_login: {
      type: Date,
    },
    profile: {
      type: profileSchema,
    },
    actions: {
      type: [actionSchema],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password_hash = await bcrypt.hash(
    user.password_hash,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password_hash = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
