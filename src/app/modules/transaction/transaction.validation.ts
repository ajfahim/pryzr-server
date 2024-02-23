import { z } from 'zod';

const purchaseOrWithdrawCreditValidationSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: 'Transaction amount is required' }),
  }),
});

export const TransactionValidations = {
  purchaseOrWithdrawCreditValidationSchema,
};
