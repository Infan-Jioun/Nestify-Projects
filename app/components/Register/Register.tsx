"use client"
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

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


type Inputs = {
    email: string,
    password: string

}
export default function Register() {
    const { data: session } = useSession();
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log("Form", data);
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password
        })
        if (res?.ok) {
            toast.success("Sucessfully Register")
        }
        else {
            alert("Register Failed")
        }

    }
    const handelGoogleRegister = () => {
        signIn("google", { callbackUrl: "/" });
    }
    const handelGithubRegister = () => {
        signIn("github", { callbackUrl: "/" });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">Welcome to Nestify</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email", { required: true })}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                            <Input {...register("password", { required: true })} id="password" placeholder='Type your password' type="password" required />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 mt-7">
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                        <Button onClick={handelGoogleRegister} variant="outline" className="w-full">
                            Continue with Google
                        </Button>
                        <Button onClick={handelGithubRegister} variant="outline" className="w-full">
                            Continue with Github
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Don’t have an account?{" "}
                            <Link href={"/LoginPage"} className="text-green-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
