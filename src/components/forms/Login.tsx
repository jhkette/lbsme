"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserSchema, SignInData } from "@/schemas/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AES } from "crypto-js";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    if(errors.email || errors.password) {
      console.log("There are errors in the form");
      return;
    }
    console.log(data);
  //   try {
  //     const loginUrl = process.env.LOGIN_URL;
  //     if (!loginUrl) {
  //       throw new Error("LOGIN_URL environment variable is not defined");
  //     }
  //     const encryptionKey = process.env.ENCRYPTION_KEY;
  //     if (!encryptionKey) {
  //       throw new Error("ENCRYPTION_KEY environment variable is not defined");
  //     }
  //     const res = await fetch(loginUrl, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: data.email,
  //         password: AES.encrypt(data.password, encryptionKey).toString(),
  //       }),
  //     });

  //     const result = await res.json();

  //     if (result.error) {
  //       throw new Error(result.message);
  //     }
  // }
  //   catch (error) {
  //     console.error("Login failed:", error);
    
  //   }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full text-center flex flex-col items-center justify-center"
    >
      <input
        type="email"
        {...register("email")}
        placeholder="Enter your name"
        className="w-3/4 p-4 rounded-lg my-4 text-lg border-1 border-black"
      />
      <div className=" w-3/4 h-4">
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <input
        type="hidden"
        {...register("password")}
        placeholder="Enter your email address"
        className="w-3/4 p-4 rounded-lg my-4 text-lg border-1 border-black"
      />
      <div className=" w-3/4 h-4">
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
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
