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

const postGamePlay = catchAsync(async (req, res) => {
  const payload = req.body;
  const { _id } = req.user;

  const result = await gamesServices.postGamePlay(payload, _id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Game play record created successfully',
    data: result,
  });
});

const getGames = catchAsync(async (req, res) => {
  const result = await gamesServices.getGames(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Games retrieved successfully',
    data: result,
  });
});

const getGameDetails = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  const result = await gamesServices.getGameDetails(gameId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Game Details retrieved successfully',
    data: result,
  });
});

export const gamesController = {
  createGame,
  getGames,
  getGameDetails,
  postGamePlay,
};
