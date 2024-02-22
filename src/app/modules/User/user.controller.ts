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

export const UserControllers = {
  register,
  login,
  getProfile,
};
