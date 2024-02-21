import { z } from 'zod';

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
  }),
});

export const UserValidation = {
  userRegistrationValidationSchema,
};
