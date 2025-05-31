"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-fit mx-auto text-center">
      <input
        type="text"
        {...register("name")}
        placeholder="Enter your name"
        className="w-3/4 p-4 rounded-lg my-8 text-lg border-1 border-black"
      />
      <input
        type="email"
        {...register("email")}
        placeholder="Enter your email address"
        className="w-3/4 p-4 rounded-lg mb-8 text-lg border-1 border-black"
      />
      <input
        type="submit"
        value="Login"
        className="w-3/4 p-4 rounded-lg mb-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
    </form>
  );
}
