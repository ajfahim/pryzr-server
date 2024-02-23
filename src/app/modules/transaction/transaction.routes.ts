import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TransactionControllers } from './transaction.controller';
import { TransactionValidations } from './transaction.validation';
const router = express.Router();

router.post(
  '/purchase-credits',
  validateRequest(TransactionValidations.purchaseCreditValidationSchema),
  auth('user'),
  TransactionControllers.purchaseCredit,
);

export const TransactionRoutes = router;
