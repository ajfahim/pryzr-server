import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const register = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.register(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.login(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await UserServices.getProfile(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const payload = req.body;
  const result = await UserServices.updateProfile(_id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});

const resetPasswordRequest = catchAsync(async (req, res) => {
  const { _id } = req.body;
  const result = await UserServices.resetPasswordRequest(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const result = await UserServices.resetPassword(payload, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successful',
    data: result,
  });
});

const getActionHistory = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await UserServices.getActionHistory(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successful',
    data: result,
  });
});

export const UserControllers = {
  register,
  login,
  getProfile,
  updateProfile,
  resetPasswordRequest,
  resetPassword,
  getActionHistory,
};
