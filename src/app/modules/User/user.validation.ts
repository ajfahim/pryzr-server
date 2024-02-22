import { z } from 'zod';

const userProfileValidationSchema = z.object({
  name: z.string().min(4, 'Name must have at least 4 characters'),
  credits: z.number().default(0).optional(),
});

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(4, 'Name must have at least 4 characters').optional(),
    credits: z.number().default(0).optional(),
  }),
});

const userRegistrationValidationSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .min(4, { message: 'userName must have at least 4 characters' })
      .max(10, { message: 'userName can not  have more than 10 characters' }),
    email: z.string().email(),
    password_hash: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Password can not have more than 15 characters'),
    profile: userProfileValidationSchema,
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password_hash: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
});

const userResetPasswordRequestValidationSchema = z.object({
  body: z.object({
    _id: z.string({
      required_error: 'User Id is required',
    }),
  }),
});

const userResetPasswordValidationSchema = z.object({
  body: z.object({
    _id: z.string({
      required_error: 'User Id is required',
    }),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Password can not have more than 15 characters'),
  }),
});

export const UserValidation = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
  updateUserProfileValidationSchema,
  userResetPasswordRequestValidationSchema,
  userResetPasswordValidationSchema,
};
