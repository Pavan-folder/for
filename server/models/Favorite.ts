import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  userId: string;
  itemType: 'trial' | 'expert' | 'publication';
  itemId: string;
  itemData: any;
  createdAt: Date;
}

const FavoriteSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ['trial', 'expert', 'publication'],
  },
  itemId: {
    type: String,
    required: true,
  },
  itemData: {
    type: Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FavoriteSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
