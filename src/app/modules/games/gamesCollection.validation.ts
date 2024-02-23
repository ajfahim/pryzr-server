import { z } from 'zod';

const createGameValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Game name is required' }),
    description: z
      .string({ required_error: 'Game description is required' })
      .min(10)
      .max(500),
    thumbnail_url: z.string({ required_error: 'Thumbnail url is required' }),
  }),
});

export const gamesCollectionValidation = {
  createGameValidationSchema,
};
