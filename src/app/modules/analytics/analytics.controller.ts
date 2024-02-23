import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnalyticsServices } from './analytics.service';

const transactionAnalytics = catchAsync(async (req, res) => {
  const result = await AnalyticsServices.transactionAnalytics();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const userAnalytics = catchAsync(async (req, res) => {
  const result = await AnalyticsServices.userAnalytics();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

export const AnalyticsController = {
  transactionAnalytics,
  userAnalytics,
};
