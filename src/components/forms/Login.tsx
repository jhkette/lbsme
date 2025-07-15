"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserSchema, SignInData } from "@/schemas/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { handleLogin } from "@/actions/login";
import { useUser } from "@/contexts/UserContext/UserProvider";
import { cn } from "@/lib/utils";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SignInData>({
  
    //@ts-expect-error this is due to a library mismatch
    resolver: zodResolver(UserSchema),
  });
  const router = useRouter(); 
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [loginError, setLoginError] = useState<string | null>(null); // State to hold login error messages
  const [loading, setLoading] = useState(false); // State to manage loading /not loading

  // get user data from UserContext
  const { setUser } = useUser();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const type = showPassword ? "text" : "password";
  const Icon = showPassword ? EyeIcon : EyeOffIcon;

  // Function to handle form submission
  // It uses the handleLogin function to authenticate the user
  // and updates the user context with the logged-in user's data
  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setLoading(true); // Set loading state to true
    if (errors.email || errors.password) {
      console.log("There are errors in the form");
      return;
    }
    clearErrors(); // clear any previous errors
    setLoginError(null); // Clear previous login error
    const logdata = await handleLogin(data.email, data.password);
   
    if (logdata.error) {
      console.log("Login failed:", logdata.error);
      setLoginError("Login failed. Please check your credentials.");
      setLoading(false); // Set loading state to false
      return;
    }
    const newUser = {
      username: logdata.data.username || "",
      email: logdata.data.email || "",
      emailVerified: logdata.data.emailVerified || false,
      familyName: logdata.data.familyName || "",
      givenName: logdata.data.givenName || "",
      phoneNumber: logdata.data.phoneNumber || "",
      postcode: logdata.data.postcode || "",
    };

    setUser(newUser); // Update the context
    setLoading(false);
    router.push("/dashboard");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full text-center flex flex-col items-center justify-center relative"
    >
      <input
        type="text"
        {...register("email")}
        placeholder="Enter your email address"
        className={cn(
          "w-2/4 p-3 rounded-lg my-4 text-lg border-1 border-gray-400",
          errors.email ? "bg-red-100" : ""
        )}
      />
      <div className=" w-3/4 h-4">
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <input
        type={type}
        {...register("password")}
        placeholder="Enter your Little birdie password"
        className={cn(
          "w-2/4 p-3 rounded-lg my-4 text-lg border-1 border-gray-400",
          errors.password ? "bg-red-100" : ""
        )}
      />
      <button
        type="button"
        className="absolute right-42 md:right-52 lg:right-58 mb-4  cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <Icon className="stroke-muted-foreground size-6 lg:size-8" />
      </button>
      <div className=" w-3/4 h-4">
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <input
        type="submit"
        value="Login"
        className="w-2/4 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
      />
      {loading && (
        <Loader className="size-8  absolute top-82 text-lbgreen animate-spin" />
      )}

      <div className=" w-3/4 h-4">
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
      </div>
    </form>
  );
}
