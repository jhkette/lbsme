"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { CodeData, CodeSchema } from "@/schemas/codeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

import { useUserSignup } from "@/contexts/UserCredentials/UserSignUpContext";
import { cn } from "@/lib/utils";

export default function ConfirmEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
 
  } = useForm<CodeData>({
    resolver: zodResolver(CodeSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to manage loading /not loading
  const [message, setMessage] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  // get user data from UserContext
  const { userCredentials, isLoading } = useUserSignup();

  // return to register if there
  // is no userCredentials from prior form
  useEffect(() => {
    if (!isLoading && !userCredentials?.email) {
      router.push("/register-user");
    }
  });

  const resendCode = async () => {

    setLoading(true);
   
    try {
       if(!userCredentials?.email){
      throw new Error("Missing username");
    }
      const { destination, deliveryMedium } = await resendSignUpCode({
        username: userCredentials?.email,
      });
      if (destination && deliveryMedium) {
        setLoading(false);
        setMessage(
          `A confirmation code has been sent to ${destination}. Please check your ${deliveryMedium} for the code.`
        );
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setConfirmEmailError(`There was an error ${err.message}`);
        console.log(err);
      } else {
        setConfirmEmailError("An unknown error occurred");
        console.log(err);
      }
    }
  };

  // Function to handle form submission
  // It uses the handleLogin function to authenticate the user
  // and updates the user context with the logged-in user's data
  const onSubmit: SubmitHandler<CodeData> = async (data) => {
  
    setMessage("");
     setLoading(true);
    try {
         if(!userCredentials?.email){
      throw new Error("Missing username");
    }
     
      const { isSignUpComplete, nextStep: submitNextStep } = await confirmSignUp({
        username: userCredentials?.email,
        confirmationCode: data.code,
      });
      console.log(isSignUpComplete, submitNextStep);
      if (submitNextStep.signUpStep === "DONE") {
        router.push("/registration-confirmed");
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setConfirmEmailError(`There was an error ${err.message}`);
        console.log(err);
      } else {
        setConfirmEmailError("An unknown error occurred");
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
        type="text"
        {...register("code")}
        placeholder="Enter your code"
        className={cn(
          "w-2/4 p-3 rounded-lg my-4 text-lg border border-gray-300 outline-none transition-all duration-200",
          errors.code
            ? "bg-red-100 border-red-400 shadow-sm"
            : "focus:shadow-md focus:border-blue-400"
        )}
      />

      <button
        onClick={resendCode}
        className="w-2/4 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbtext text-white cursor-pointer hover:bg-lbgreen transition duration-300"
      >
        Resend email code
      </button>

      <div className=" w-3/4 h-4">
        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code.message}</p>
        )}
      </div>

      <input
        type="submit"
        value="Continue"
        className="w-2/4 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
      {loading && (
        <LoaderCircle  className="size-12  absolute top-82 text-lbgreen animate-spin" />
      )}
      {!!message.length && <p className="mt-12 text-sm text-lbtext">{message}</p>}
      {!!confirmEmailError.length && (
        <p className="mt-8 text-red-500 text-sm">{confirmEmailError} </p>
      )}
    </form>
  );
}
