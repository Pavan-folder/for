import mongoose, { Schema, Document } from 'mongoose';

export interface IReply extends Document {
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: 'patient' | 'researcher';
  content: string;
  createdAt: Date;
}

const ReplySchema: Schema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorRole: {
    type: String,
    required: true,
    enum: ['patient', 'researcher'],
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReplySchema.index({ postId: 1, createdAt: 1 });

export default mongoose.model<IReply>('Reply', ReplySchema);
