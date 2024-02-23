/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { gamesController } from './games.controller';
import { gamesCollectionValidation } from './gamesCollection.validation';
import { GamePlayRecordValidation } from '../gameplayRecords/gamePlayRecords.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(gamesCollectionValidation.createGameValidationSchema),
  gamesController.createGame,
);
router.post(
  '/play',
  auth('user'),
  validateRequest(GamePlayRecordValidation.postGamePlayRecordValidationScheme),
  gamesController.postGamePlay,
);
router.get('/', auth('user'), gamesController.getGames);
router.get('/:gameId', auth('user'), gamesController.getGameDetails);

export const GamesRoutes = router;
