"use client"
import React from 'react'
import NextHead from '../components/NextHead/NextHead'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
    email: string
}
export default function ResetPasswordPage() {
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
        });

        if (res.ok) {
            toast.success("If that email exists, we sent a reset link.");

        } else {
            toast.error("Something went wrong. Try again.");
        }
    };
    return (
        <div>
            <NextHead title='Reset your password | Nestify' />
            <div className="min-h-screen bg-green-100 flex items-center justify-center  dark:bg-gray-900 px-4">
                <Card className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">
                            <Image className="mx-auto"
                                src="https://i.ibb.co/RpTRch3g/Nestify.png"
                                alt="logo"
                                width={80}
                                height={80} />

                        </CardTitle>
                        <CardDescription className="text-sm  text-gray-500 dark:text-gray-400">
                            Reset your password to Nestify – Access Your Dashboard Securely <br /> <span className='text-red-500'>Functionality Comming soon</span>
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid gap-1 mb-3">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register("email", { required: true })}
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                        </CardContent>
                        <CardFooter><Button disabled className='w-full bg-green-500 hover:bg-green-700 text-white'>Send Reset Link</Button></CardFooter>
                    </form>

                </Card>
            </div>
        </div>
    )
}
