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
    message: 'User Registered successfully',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.login(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged In successfully',
    data: result,
  });
});

export const UserControllers = {
  register,
  login,
};
