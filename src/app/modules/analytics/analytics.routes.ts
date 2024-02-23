import express from 'express';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.get(
  '/transactions',
  auth('admin'),
  AnalyticsController.transactionAnalytics,
);

router.get('/users', auth('admin'), AnalyticsController.userAnalytics);
router.get('/gameplays', auth('admin'), AnalyticsController.gamePlayAnalytics);

export const AnalyticsRoutes = router;
