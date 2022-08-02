import { Schema, model, Types } from 'mongoose';

export type AuthRole = 'ADMIN' | 'USER';

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  verifyEmail: boolean;
  verifyEmailToken: string[];
  resetToken: string[];
  auth: AuthRole;
  firstName: string;
  lastName: string;
  occupation: string;
  clinics: Types.ObjectId[];
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    verifyEmail: { type: Boolean, default: false },
    verifyEmailToken: [{ type: String }],
    resetToken: [{ type: String }],
    auth: { type: String, default: 'USER' },
    firstName: { type: String },
    lastName: { type: String },
    occupation: { type: String, default: 'Dentist' },
    clinics: [{ type: Schema.Types.ObjectId, ref: 'Clinic' }],
    qrCode: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Employee = model<IEmployee>('Employee', employeeSchema);
