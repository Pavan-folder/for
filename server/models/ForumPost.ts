import mongoose, { Schema, Document } from 'mongoose';

export interface IForumPost extends Document {
  forumId: string;
  authorId: string;
  authorName: string;
  authorRole: 'patient' | 'researcher';
  title: string;
  content: string;
  likes: number;
  likedBy: string[];
  createdAt: Date;
}

const ForumPostSchema: Schema = new Schema({
  forumId: {
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
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ForumPostSchema.index({ forumId: 1, createdAt: -1 });

export default mongoose.model<IForumPost>('ForumPost', ForumPostSchema);
