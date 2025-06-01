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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center flex flex-col items-center justify-center">
      <input
        type="text"
        {...register("email")}
        placeholder="Enter your name"
        className="w-3/4 p-4 rounded-lg my-4 text-lg border-1 border-black"
      />
       <div className=" w-3/4 h-4">
      {errors.email && (
        <p className="text-red-500 text-sm">
          {errors.email.message}
        </p>
      )}
      </div>
      
      <input
        type="text"
        {...register("password")}
        placeholder="Enter your email address"
        className="w-3/4 p-4 rounded-lg my-4 text-lg border-1 border-black"
      />
      <div className=" w-3/4 h-4">
      {errors.password && (
        <p className="text-red-500 text-sm">
          {errors.password.message}
        </p>
      )}
      </div>
      <input
        type="submit"
        value="Login"
        className="w-3/4 p-4 rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
    </form>
  );
}
