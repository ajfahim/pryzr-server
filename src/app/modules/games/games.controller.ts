import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { gamesServices } from './gamesCollection.service';

const createGame = catchAsync(async (req, res) => {
  const payload = req.body;
  const { _id } = req.user;
  const result = await gamesServices.createGame(payload, _id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Game created successfully',
    data: result,
  });
});

export const gamesController = {
  createGame,
};
