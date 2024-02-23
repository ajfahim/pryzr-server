import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransactionServices } from './transaction.service';

const purchaseCredit = catchAsync(async (req, res) => {
  const user_id = req.user._id;
  const payload = req.body;
  const result = await TransactionServices.purchaseCredit(user_id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction successful',
    data: result,
  });
});

const withdrawCredits = catchAsync(async (req, res) => {
  const user_id = req.user._id;
  const payload = req.body;
  const result = await TransactionServices.withdrawCredits(user_id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction successful',
    data: result,
  });
});

export const TransactionControllers = {
  purchaseCredit,
  withdrawCredits,
};
