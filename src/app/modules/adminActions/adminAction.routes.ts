import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AdminControllers } from './adminAction.controller';

const router = express.Router();

router.get('/users', auth('admin'), AdminControllers.getAllUsers);
router.post(
  '/users',
  auth('admin'),
  validateRequest(UserValidation.userRegistrationValidationSchema),
  AdminControllers.createNewUser,
);

export const AdminActionRoutes = router;
