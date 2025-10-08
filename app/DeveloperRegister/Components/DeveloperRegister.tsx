"use client"
import React, { useState, useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import {
    setButtonLoader,
    setSkletonLoader,
    setGoogleLoader,
    setGithubLoader
} from '@/app/features/loader/loaderSlice'
import { RootState } from '@/lib/store'
import { Eye, EyeOff } from 'lucide-react'
import NextHead from '@/app/components/NextHead/NextHead'

type Inputs = {
    name: string
    email: string
    password: string
    mobile: string | null;
    location: string | null;
    role: "real_estate_developer"


}

export default function DeveloperRegister() {
    const dispatch = useDispatch();
    const buttonLoader = useSelector((state: RootState) => state.loader.buttonLoader);
    const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
    const googleLoader = useSelector((state: RootState) => state.loader.googleLoader);
    const githubLoader = useSelector((state: RootState) => state.loader.githubLoader);

    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            dispatch(setSkletonLoader(false));
        }, 1500);
        return () => clearTimeout(timer);
    }, [dispatch]);

    const isLoading = loading || skletonLoader;

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        dispatch(setButtonLoader(true));
        try {
            const payload = {...formData, role: "real_estate_developer"};
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(data.message || "Account created successfully");
                setError(null);

                
                localStorage.setItem("verificationEmail", formData.email);
                router.push("/verify-email");
            } else if (res.status === 400) {
                setError(data.message || "Invalid request");
            } else if (res.status === 500) {
                setError(data.message || "Server error");
            }
        } catch (err) {
            setError("An error occurred during registration");
        } finally {
            dispatch(setButtonLoader(false));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (isLoading) {
        return (
            <div>
                <NextHead title='Developer - Nestify' />
                <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900 px-4">
                    <Card className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950 animate-pulse">
                        <CardHeader className="text-center space-y-2">
                            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-1">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                            <div className="grid gap-1">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                            <div className="grid gap-1">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 mt-7">
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                        </CardFooter>
                        <div className='px-6 pb-6 space-y-2'>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NextHead title='Developer - Nestify' />
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
                            {"Create Your Nestify Developer Account – Join as a Real Estate Partne"}
                        </CardDescription>
                    </CardHeader>


                    {!!success && (
                        <div className='px-3'>
                            <p className='text-white text-center bg-green-500 p-2 rounded-2xl flex justify-center items-center gap-4'>
                                <span className='text-xl'><MdOutlineCheck /></span>{success}
                            </p>
                        </div>
                    )}
                    {!!error && (
                        <div className='px-3'>
                            <p className='text-red-400 text-center bg-red-100 p-2 rounded-2xl flex justify-center items-center gap-4'>
                                <span className='text-xl'><BiError /></span>{error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid gap-1">
                                <Label htmlFor="name">Developer Name</Label>
                                <Input {...register("name", { required: "Name is required" })}
                                    id="name"
                                    type="text"
                                    placeholder="exp : Infan Jioun "
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register("email", { required: "Email is required" })}
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="location">Location</Label>
                                <Input {...register("location", { required: "Location is required" })}
                                    id="location"
                                    type="text"
                                    placeholder="exp : Cox'sBazar "
                                />
                                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="mobile">Phone</Label>
                                <Input {...register("mobile", { required: "Name is required" })}
                                    id="mobile"
                                    type="text"
                                    placeholder="exp : 0123233232323 "
                                />
                                {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
                            </div>
                            <div className="grid gap-1 relative">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        {...register("password", { required: "Password is required" })}
                                        id="password"
                                        placeholder='Type your password'
                                        type={showPassword ? "text" : "password"}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-green-500" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3 mt-7">
                            <Button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600"
                                disabled={buttonLoader}
                            >
                                {buttonLoader ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Devleoper Account"
                                )}
                            </Button>

                            <p className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <Link href={"/LoginPage"} className="relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 ">
                                    Login
                                </Link>
                            </p>
                        </CardFooter>
                    </form>

           
                </Card>
            </div>
        </div>
    )
}
