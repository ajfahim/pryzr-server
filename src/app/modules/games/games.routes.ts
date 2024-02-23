/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { gamesController } from './games.controller';
import { gamesCollectionValidation } from './gamesCollection.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(gamesCollectionValidation.createGameValidationSchema),
  gamesController.createGame,
);

export const GamesRoutes = router;