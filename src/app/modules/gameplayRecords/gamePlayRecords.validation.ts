import { z } from 'zod';

const postGamePlayRecordValidationScheme = z.object({
  body: z.object({
    game_id: z.string({ required_error: 'game id is required' }),
    bet_credits: z.number({ required_error: 'bet credit is required' }),
    win_credits: z.number({ required_error: 'bet credit is required' }),
  }),
});

export const GamePlayRecordValidation = {
  postGamePlayRecordValidationScheme,
};
