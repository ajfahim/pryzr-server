import express from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './adminAction.controller';

const router = express.Router();

router.get('/users', auth('admin'), AdminControllers.getAllUsers);

export const AdminActionRoutes = router;
