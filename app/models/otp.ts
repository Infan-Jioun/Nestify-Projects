import  { Document, Schema, model, models } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  verified: boolean;
}

const otpSchema = new Schema<IOTP>({
  email: {  type: String, required: true,  index: true },
  otp: { 
    type: String, 
    required: true 
  },
  expiresAt: { 
    type: Date, 
    required: true,
    index: { expires: '5m' } 
  },
  attempts: { 
    type: Number, 
    default: 0 
  },
  verified: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

const OTP = models.OTP || model<IOTP>("OTP", otpSchema);
export default OTP;