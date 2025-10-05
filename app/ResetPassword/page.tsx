"use client";

import React, { useState } from 'react';
import NextHead from '../components/NextHead/NextHead';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import OTPInputComponent from '../components/Login/Components/otp-input';


type Inputs = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

type Step = 'email' | 'otp' | 'newPassword';

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const newPassword = watch("newPassword");

  // Send OTP
  const sendOTP = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
        setStep('otp');
        startCountdown();
      } else {
        toast.error(result.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("OTP verified!");
        setStep('newPassword');
      } else {
        toast.error(result.error || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          newPassword: data.newPassword
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully!");
        // Redirect to login
        window.location.href = "/LoginPage";
      } else {
        toast.error(result.error || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend OTP
  const resendOTP = async () => {
    if (countdown > 0) return;
    await sendOTP(email);
  };

  return (
    <div>
      <NextHead title='Reset Password -\ Nestify' />
      <div className="min-h-screen bg-green-100 flex items-center justify-center dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">
              <Image 
                className="mx-auto"
                src="https://i.ibb.co/RpTRch3g/Nestify.png"
                alt="logo"
                width={80}
                height={80} 
              />
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              {step === 'email' && "Enter your email to receive OTP"}
              {step === 'otp' && "Enter OTP sent to your email"}
              {step === 'newPassword' && "Create new password"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Step 1: Email Input */}
            {step === 'email' && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/i,
                        message: "Invalid email address"
                      }
                    })}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                
                <Button 
                  onClick={() => sendOTP(email)}
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={loading || !email}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </div>
            )}

            {/* Step 2: OTP Input */}
            {step === 'otp' && (
              <div className="space-y-4">
                <OTPInputComponent 
                  onComplete={verifyOTP}
                  disabled={loading}
                />
                
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={resendOTP}
                    disabled={countdown > 0 || loading}
                    className="gap-2"
                  >
                    <RotateCcw size={16} />
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="w-full"
                >
                  Change Email
                </Button>
              </div>
            )}

            {/* Step 3: New Password */}
            {step === 'newPassword' && (
              <form onSubmit={handleSubmit(resetPassword)} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input 
                      {...register("newPassword", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      {...register("confirmPassword", { 
                        required: "Please confirm password",
                        validate: value => 
                          value === newPassword || "Passwords don't match"
                      })}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter>
            <Link 
              href="/LoginPage" 
              className="text-sm text-center text-green-600 hover:text-green-700 w-full"
            >
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}