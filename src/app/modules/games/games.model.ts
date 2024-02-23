import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { TGames } from './games.interface';

const gamesSchema = new Schema<TGames>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    rtp_percentage: { type: Number, default: 0 },
  },
  { timestamps: true },
);

gamesSchema.plugin(aggregatePaginate);

export const Games = model<TGames>('Games', gamesSchema);
