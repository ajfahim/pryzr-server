import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .min(4, { message: 'userName must have at least 4 characters' })
      .max(50, { message: 'userName can not  have more than 50 characters' })
      .optional(),
    email: z.string().email().optional(),
    profile: z.object({
      name: z
        .string()
        .min(4, 'Name must have at least 4 characters')
        .optional(),
      credits: z.number().default(0).optional(),
    }),
  }),
});

const updateUserCreditValidationSchema = z.object({
  body: z.object({
    type: z.enum(['purchase', 'withdrawal'], {
      required_error: 'Transaction type is required',
    }),
    amount: z.number({ required_error: 'Amount is required' }),
  }),
});

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['active', 'blocked'], {
      required_error: 'Status type is required',
    }),
  }),
});

export const AdminActionsValidation = {
  updateUserValidationSchema,
  updateUserCreditValidationSchema,
  updateUserStatusValidationSchema,
};
