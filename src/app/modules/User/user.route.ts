/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userRegistrationValidationSchema),
  UserControllers.register,
);
router.post(
  '/login',
  validateRequest(UserValidation.userLoginValidationSchema),
  UserControllers.login,
);
router.get('/profile', auth('user', 'admin'), UserControllers.getProfile);

export const UserRoutes = router;
