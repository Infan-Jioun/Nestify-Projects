"use client"
import React from 'react'
import MyHelmet from '../Hooks/MyHelmet'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


type Inputs = {
  email: string,
  password: string

}
export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form", data);
    router.push("/")
  }
  return (
    <div>
      <MyHelmet title='RegisterPage | Nestify' />
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" className="input bg-white text-black" placeholder="Email"  {...register("email", { required: true })} />
                  <label className="label">Password</label>
                  <input
                    type="password" className="input bg-white text-black" placeholder="Password" {...register("password", { required: true })} />
                  <div><a className="link link-hover">Forgot password?</a></div>
                  <button type='submit' className="btn btn-neutral mt-4">Login</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div></div>
  )
}
