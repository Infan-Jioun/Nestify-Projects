"use client"
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { BiError } from "react-icons/bi";
import { MdOutlineCheck } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link'

import Image from 'next/image'
import NextHead from '../NextHead/page'



type Inputs = {
    name: string,
    email: string,
    password: string

}
export default function Register() {

    const router = useRouter();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        console.log("Form", formData);
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)

        })
        const data = await res.json()
        console.log("user info", res);

        if (res.ok) {
            // toast.success(data.message)
            setSuccess(data.message)
            router.push("/LoginPage")
        } else if (res.status === 400) {
            setError(data.message)
        } else if (res.status === 500) {
            setError(data.message)
        }

    }
    const handelGoogleRegister = () => {
        signIn("google", { callbackUrl: "/" });

    }
    const handelGithubRegister = () => {
        signIn("github", { callbackUrl: "/" });
    }
    return (
        <div>
            <NextHead title='Register | Nestify'></NextHead>
            <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900 px-4">

                <Card className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">
                            <Image className="mx-auto"
                                src="https://i.ibb.co/RpTRch3g/Nestify.png"
                                alt="logo"
                                width={80}
                                height={80} />
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                            Create Your Nestify Account – Fast & Secure Sign Up
                        </CardDescription>
                    </CardHeader>
                    {!!success && (
                        <div className='px-3'>

                            <p className='text-white text-center bg-green-500 p-2 rounded-2xl flex justify-center items-center gap-4'><span className='text-xl'><MdOutlineCheck /></span>{success}</p>
                        </div>
                    )}
                    {!!error && (
                        <div className='px-3'>

                            <p className='text-red-400 text-center bg-red-100 p-2 rounded-2xl flex justify-center items-center gap-4'><span className='text-xl'><BiError /></span>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid gap-1">
                                <Label htmlFor="name">Name</Label>
                                <Input   {...register("name", { required: true })}
                                    id="name"
                                    type="name"
                                    placeholder="exp : Infan Jioun "
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input   {...register("email", { required: true })}
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register("password", { required: true })} id="password" placeholder='Type your password' type="password" required />
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>

                        </CardContent>

                        <CardFooter className="flex flex-col gap-3 mt-7">
                            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                                Sign up
                            </Button>

                            <p className="text-sm text-center text-muted-foreground">
                                Don’t have an account?{" "}
                                <Link href={"/LoginPage"} className=" relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 ">
                                    Login
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                    <div className='px-6'>
                        <Button onClick={handelGoogleRegister} variant="outline" className="w-full mb-2">
                            Continue with Google
                        </Button>
                        <Button onClick={handelGithubRegister} variant="outline" className="w-full">
                            Continue with Github
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
