"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordSchema , PasswordData} from "@/schemas/passwodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { signUp } from "aws-amplify/auth"
import { useUserSignup } from "@/contexts/UserCredentials/UserSignUpContext";
import { cn } from "@/lib/utils";

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
//   const [showPasswordTwo, setShowPasswordTwo] = useState(false); // Toggle for password visibility
  const [loginError, setLoginError] = useState<string | null>(null); // State to hold login error messages
  const [loading, setLoading] = useState(false); // State to manage loading /not loading

  // get user data from UserContext
   const { setUserCredentials, userCredentials } = useUserSignup();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

//   const togglePasswordVisibilityTwo = () => {
//     setShowPasswordTwo((prev) => !prev);
//   };

  const type = showPassword ? "text" : "password";
  const Icon = showPassword ? EyeIcon : EyeOffIcon;

//   const typeTwo = showPasswordTwo ? "text" : "password";
//   const IconTwo = showPasswordTwo ? EyeIcon : EyeOffIcon;

  // Function to handle form submission
  // It uses the handleLogin function to authenticate the user
  // and updates the user context with the logged-in user's data
  const onSubmit: SubmitHandler<PasswordData> = async (data) => {

   console.log("submit ran")
    const { isSignUpComplete, userId, nextStep } = await signUp({
  username: userCredentials?.email!,
  password:  data.password,
  options: {
    userAttributes: {
      email: userCredentials?.email,
      
          phone_number: userCredentials?.phoneNumber!,
          given_name: userCredentials?.given_name,
          family_name: userCredentials?.family_name,
          "custom:terms_and_conditions": userCredentials?.terms_and_conditions,
    },
  }
});
 
console.log(isSignUpComplete, userId, nextStep)

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
      {/* <input
        type={typeTwo}
        {...register("password")}
        placeholder="Verify your password"
        className={cn(
          "w-2/4 p-3 rounded-lg my-4 text-lg border border-gray-300 outline-none transition-all duration-200",
          errors.password
            ? "bg-red-100 border-red-400 shadow-sm"
            : "focus:shadow-md focus:border-blue-400"
        )}
      />
      <button
        type="button"
        className="absolute top-33 right-42 md:right-52 lg:right-58 mb-4  cursor-pointer"
        onClick={togglePasswordVisibilityTwo}
      >
        <IconTwo className="stroke-muted-foreground size-5 lg:size-6" />
      </button>
      <div className=" w-3/4 h-4">
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div> */}
      <input
        type="submit"
        value="Continue"
        className="w-2/4 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
    </form>
  );
}
