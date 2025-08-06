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
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
type Inputs = {
  email: string,
  password: string

}
export function Login() {
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
      router.push("/")
      toast.success("Successfully Login")
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
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-green-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input {...register("password", { required: true })} id="password" type="password" placeholder='Type your password' required />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-3">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button onClick={handelGoogleRegister} variant="outline" className="w-full">
              Continue with Google
            </Button>
            <Button onClick={handelGithubRegister} variant="outline" className="w-full">
              Continue with Github
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link href={"/RegisterPage"} className="text-green-500 hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
