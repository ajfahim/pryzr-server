import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AdminControllers } from './adminAction.controller';
import { AdminActionsValidation } from './adminAction.validation';

const router = express.Router();

router.get('/users', auth('admin'), AdminControllers.getAllUsers);
router.post(
  '/users',
  auth('admin'),
  validateRequest(UserValidation.userRegistrationValidationSchema),
  AdminControllers.createNewUser,
);
router.put(
  '/users/:userId',
  auth('admin'),
  validateRequest(AdminActionsValidation.updateUserValidationSchema),
  AdminControllers.updateUser,
);

router.put(
  '/users/:userId/credits',
  auth('admin'),
  validateRequest(AdminActionsValidation.updateUserCreditValidationSchema),
  AdminControllers.updateCredits,
);

router.put(
  '/users/:userId/status',
  auth('admin'),
  validateRequest(AdminActionsValidation.updateUserStatusValidationSchema),
  AdminControllers.updateStatus,
);

router.get('/transactions', auth('admin'), AdminControllers.getAllTransactions);

export const AdminActionRoutes = router;
