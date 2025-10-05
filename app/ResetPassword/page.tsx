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

type Inputs = {
    email: string;
};

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);

        try {
            console.log("🔄 Sending forgot password request...", data);

            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email }),
            });

            console.log("📨 Response status:", res.status);

            let result;
            try {
                result = await res.json();
                console.log("📨 Response data:", result);
            } catch (jsonError) {
                console.error("❌ JSON Parse Error:", jsonError);
                toast.error("Invalid response from server");
                return;
            }

            if (res.ok) {
                toast.success(result.message || "Reset link sent successfully!");
            } else {
                toast.error(result.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("❌ Network Error:", error);
            toast.error("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NextHead title='Reset your password | Nestify' />
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
                            Enter your email to reset your password
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid gap-1 mb-3">
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
                                    required
                                    disabled={loading}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>

                            <Link
                                href="/LoginPage"
                                className="text-sm text-center text-green-600 hover:text-green-700"
                            >
                                Back to Login
                            </Link>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}