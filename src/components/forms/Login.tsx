"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserSchema, SignInData } from "@/schemas/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";



export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(UserSchema)
  } )


  const onSubmit: SubmitHandler<SignInData> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-fit mx-auto text-center">
      <input
        type="text"
        {...register("email")}
        placeholder="Enter your name"
        className="w-3/4 p-4 rounded-lg my-8 text-lg border-1 border-black"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-4">
          {errors.email.message}
        </p>
      )}
      <input
        type="text"
        {...register("password")}
        placeholder="Enter your email address"
        className="w-3/4 p-4 rounded-lg mb-8 text-lg border-1 border-black"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-4">
          {errors.password.message}
        </p>
      )}
      <input
        type="submit"
        value="Login"
        className="w-3/4 p-4 rounded-lg mb-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
    </form>
  );
}
