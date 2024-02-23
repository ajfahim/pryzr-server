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
router.get('/profile', auth('user'), UserControllers.getProfile);
router.put(
  '/profile',
  auth('user'),
  validateRequest(UserValidation.updateUserProfileValidationSchema),
  UserControllers.updateProfile,
);
router.post(
  '/password-reset',
  validateRequest(UserValidation.userResetPasswordRequestValidationSchema),
  UserControllers.resetPasswordRequest,
);
router.put(
  '/password-reset',
  validateRequest(UserValidation.userResetPasswordValidationSchema),
  UserControllers.resetPassword,
);
router.get('/actions', auth('user'), UserControllers.getActionHistory);

export const UserRoutes = router;
