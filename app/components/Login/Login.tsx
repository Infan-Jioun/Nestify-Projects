"use client";

import MyHelmet from "@/app/Hooks/MyHelmet";
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
type Inputs = {
  email: string,
  password: string

}
export function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>()
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
  const handelGoogleLogin = () => {

    signIn("google", { callbackUrl: "/" });
  }
  const handelGithubLogin = () => {

    signIn("github", { callbackUrl: "/" });
  }
  return (
    <div>
      <MyHelmet title='Login | Nestify'></MyHelmet>
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
              Login to Nestify – Access Your Dashboard Securely
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
                  <Link
                    href={"/ResetPassword"}
                    className=" text-sm relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 rounded mb-2"
                  >
                    Reset password?
                  </Link>
                </div>
                <Input {...register("password", { required: true })} id="password" type="password" placeholder='Type your password' className="" required />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 mt-3">
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                Login
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Don’t have an account?{" "}
                <Link href={"/RegisterPage"} className="  relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
          <div className="px-6 ">
            <Button onClick={handelGoogleLogin} variant="outline" className="w-full mb-2 ">
              Continue with Google
            </Button>
            <Button onClick={handelGithubLogin} variant="outline" className="w-full">
              Continue with Github
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
