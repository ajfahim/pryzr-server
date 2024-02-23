import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './adminAction.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const createNewUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminServices.createNewUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const { userId } = req.params;

  const result = await AdminServices.updateUser(userId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully',
    data: result,
  });
});

const updateCredits = catchAsync(async (req, res) => {
  const payload = req.body;
  const { userId } = req.params;

  const result = await AdminServices.updateCredits(userId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Credits Updated successfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const payload = req.body;
  const { userId } = req.params;

  const result = await AdminServices.updateStatus(userId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status Updated successfully',
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllTransactions(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transactions retrieved successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllUsers,
  createNewUser,
  updateUser,
  updateCredits,
  updateStatus,
  getAllTransactions,
};
