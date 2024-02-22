import { z } from 'zod';

const userProfileValidationSchema = z.object({
  name: z.string().min(4, 'Name must have at least 4 characters'),
  credits: z.number().default(0).optional(),
  reset_password_token: z.string().optional(),
  reset_password_expires: z.date().optional(),
  status: z.enum(['active', 'blocked']).optional(),
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
      .max(20, { message: 'Password can not be more than 20 characters' }),
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

export const UserValidation = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
};
