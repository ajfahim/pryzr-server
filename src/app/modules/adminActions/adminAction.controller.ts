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

export const AdminControllers = {
  getAllUsers,
  createNewUser,
};
