export interface OTP {
    _id?: string;
    email: string;
    otp: string;
    expiresAt: Date;
    attempts: number;
    createdAt?: Date;
}

export interface OTPVerificationRequest {
    email: string;
    otp: string;
}