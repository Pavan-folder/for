import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  role: 'patient' | 'researcher';
  email?: string;
  createdAt: Date;
  patientProfile?: {
    conditions: string[];
    location: string;
  };
  researcherProfile?: {
    specialties: string[];
    interests: string[];
    orcid?: string;
    availableForMeetings: boolean;
    bio?: string;
    credentials?: string;
    publications?: number;
  };
}

const UserSchema: Schema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ['patient', 'researcher'],
  },
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  patientProfile: {
    conditions: [String],
    location: String,
  },
  researcherProfile: {
    specialties: [String],
    interests: [String],
    orcid: String,
    availableForMeetings: Boolean,
    bio: String,
    credentials: String,
    publications: Number,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
