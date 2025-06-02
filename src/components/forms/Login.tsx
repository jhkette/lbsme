"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserSchema, SignInData } from "@/schemas/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { handleLogin } from "@/actions/login";
import { useUser } from "@/contexts/UserContext/UserProvider";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SignInData>({
    resolver: zodResolver(UserSchema),
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { setUser } = useUser();
  const type = showPassword ? "text" : "password";
  const Icon = showPassword ? EyeIcon : EyeOffIcon;

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    if (errors.email || errors.password) {
      console.log("There are errors in the form");
      return;
    }
    clearErrors();
    const logdata = await handleLogin(data.email, data.password);
    console.log("Login data:", logdata);
    setUser({
      username: logdata.data.username || "",
      email: logdata.data.email || "",
      emailVerified: logdata.data.emailVerified || false,
      familyName: logdata.data.familyName || "",
      givenName: logdata.data.givenName || "",
      phoneNumber: logdata.data.phoneNumber || "",
      postcode: logdata.data.postcode || ""
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full text-center flex flex-col items-center justify-center relative"
    >
      <input
        type="email"
        {...register("email")}
        placeholder="Enter your email address"
        className="w-3/4 p-4 rounded-lg my-4 text-lg border-1 border-black"
      />
      <div className=" w-3/4 h-4">
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <input
        type={type}
        {...register("password")}
        placeholder="Enter your Littlebirdie password"
        className="w-3/4 p-4 rounded-lg my-4 text-lg border-1 border-black"
      />
      <button
        type="button"
        className="absolute right-28  cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <Icon className="stroke-muted-foreground size-8" />
      </button>
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
