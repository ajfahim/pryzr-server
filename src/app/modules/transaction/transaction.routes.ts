import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TransactionControllers } from './transaction.controller';
import { TransactionValidations } from './transaction.validation';
const router = express.Router();

router.post(
  '/purchase-credits',
  validateRequest(
    TransactionValidations.purchaseOrWithdrawCreditValidationSchema,
  ),
  auth('user'),
  TransactionControllers.purchaseCredit,
);

router.post(
  '/withdraw-credits',
  validateRequest(
    TransactionValidations.purchaseOrWithdrawCreditValidationSchema,
  ),
  auth('user'),
  TransactionControllers.withdrawCredits,
);

router.get(
  '/user/:userId',
  auth('admin'),
  TransactionControllers.getTransactionsByUserId,
);

export const TransactionRoutes = router;
