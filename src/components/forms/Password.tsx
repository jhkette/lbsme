"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordSchema, PasswordData } from "@/schemas/passwodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { signUp } from "aws-amplify/auth";
import { useUserSignup } from "@/contexts/UserCredentials/UserSignUpContext";
import { cn } from "@/lib/utils";
import { STORAGE_KEY } from "@/lib/consts";

export default function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<PasswordData>({
    resolver: zodResolver(PasswordSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [passwordFormError, setPasswordFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { userCredentials, isLoading } = useUserSignup();

  // return to register if there
  // is no userCredentials from prior form
  useEffect(() => {
    if (!isLoading && (!userCredentials?.email|| !userCredentials?.companyDetails.title)) {
      router.push("/register-user");
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const type = showPassword ? "text" : "password";
  const Icon = showPassword ? EyeIcon : EyeOffIcon;

  // calls aws amplify signUp function
  const onSubmit: SubmitHandler<PasswordData> = async (data) => {
    const {
      email,
      phoneNumber,
      given_name,
      family_name,
      terms_and_conditions,
    } = userCredentials ?? {};

    setLoading(true);
     clearErrors(); // clear any previous errors
    try {
      if (
        !email ||
        !phoneNumber ||
        !given_name ||
        !family_name ||
        !terms_and_conditions
      ) {
        throw new Error("Missing required user details.");
      }
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password: data.password,
        options: {
          userAttributes: {
            email: email,

            phone_number: phoneNumber,
            given_name: given_name,
            family_name: family_name,
            "custom:terms_and_conditions": terms_and_conditions,
          },
        },
      });

      console.log(isSignUpComplete, userId, nextStep);
      // may need refining
      if (nextStep.signUpStep) {
        router.push("/confirm-email");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        
        setPasswordFormError(`There was an error: ${err.message.toLowerCase()}`);
        console.log(err);
      } else {
        setPasswordFormError("An unknown error occurred");
        console.log(err);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full text-center flex flex-col items-center justify-center relative"
    >
      <input
        type={type}
        {...register("password")}
        placeholder="Enter your password"
        className={cn(
          "w-2/4 p-3 rounded-lg my-4 text-lg border border-gray-300 outline-none transition-all duration-200",
          errors.password
            ? "bg-red-100 border-red-400 shadow-sm"
            : "focus:shadow-md focus:border-blue-400"
        )}
      />
      <button
        type="button"
        className="absolute top-8 right-42 md:right-52 lg:right-58 mb-4  cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <Icon className="stroke-muted-foreground size-5 lg:size-6" />
      </button>
      <div className=" w-3/4 h-4">
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <input
        type="submit"
        value="Continue"
        className="w-2/4 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
      {loading && (
        <Loader className="size-8  absolute top-48 text-lbgreen animate-spin" />
      )}

      {!!passwordFormError.length && (
        <p className="text-red-500 text-sm">{passwordFormError} </p>
      )}
    </form>
  );
}
