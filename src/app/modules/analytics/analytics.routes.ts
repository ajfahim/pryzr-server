import express from 'express';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.get(
  '/transactions',
  auth('admin'),
  AnalyticsController.transactionAnalytics,
);

export const AnalyticsRoutes = router;
