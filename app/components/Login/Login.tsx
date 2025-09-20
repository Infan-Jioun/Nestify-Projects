"use client";

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
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import NextHead from "../NextHead/NextHead";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setButtonLoader,
  setSkletonLoader,
  setGoogleLoader,
  setGithubLoader,
} from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store";

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const dispatch = useDispatch();
  const buttonLoader = useSelector(
    (state: RootState) => state.loader.buttonLoader
  );
  const skletonLoader = useSelector(
    (state: RootState) => state.loader.skletonLoader
  );
  const googleLoader = useSelector(
    (state: RootState) => state.loader.googleLoader
  );
  const githubLoader = useSelector(
    (state: RootState) => state.loader.githubLoader
  );
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 1500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const isLoading = loading || skletonLoader;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(setButtonLoader(true));

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/");
      toast.success("Successfully Login");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }

    dispatch(setButtonLoader(false));
  };

  const handelGoogleLogin = async () => {
    dispatch(setGoogleLoader(true));
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast.error("Google login failed");
    } finally {
      dispatch(setGoogleLoader(false));
    }
  };

  const handelGithubLogin = async () => {
    dispatch(setGithubLoader(true));
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      toast.error("GitHub login failed");
    } finally {
      dispatch(setGithubLoader(false));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 🔹 Skeleton Loader Fix
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900 overflow-hidden">
        <NextHead title="Login | Nestify" />
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
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 mt-3">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </CardFooter>
          <div className="px-6 pb-6 space-y-2">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </Card>
      </div>
    );
  }

  // 🔹 Login Form
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center dark:bg-gray-900 px-4 overflow-hidden">
      <NextHead title="Login | Nestify" />
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
            Login to Nestify – Access Your Dashboard Securely
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={"/ResetPassword"}
                  className="text-sm relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 rounded mb-2"
                >
                  Reset password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  {...register("password", { required: true })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  className="pr-10"
                  required
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
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-3">
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={buttonLoader}
            >
              {buttonLoader ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              {"Don't have an account?"}{" "}
              <Link
                href={"/RegisterPage"}
                className="relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 rounded"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
        <div className="px-6 pb-6">
          <Button
            onClick={handelGoogleLogin}
            variant="outline"
            className="w-full mb-2"
            disabled={googleLoader}
          >
            {googleLoader ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Continuing with Google...
              </div>
            ) : (
              "Continue with Google"
            )}
          </Button>
          <Button
            onClick={handelGithubLogin}
            variant="outline"
            className="w-full"
            disabled={githubLoader}
          >
            {githubLoader ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Continuing with GitHub...
              </div>
            ) : (
              "Continue with Github"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
