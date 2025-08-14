"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserSignup } from "@/contexts/UserCredentials/UserSignUpContext";
import { useEffect } from "react";
import EmailConfirmedBird from "@/components/auth/EmailConfirmedBird";
export default function Page() {
  const { clearUserCredentials } = useUserSignup();

  useEffect(() => {
    clearUserCredentials();
  }, [clearUserCredentials]);

  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full h-screen relative">
         <Link href={"/"}>
               <Image
                src="/images/main/lbsmelogo.svg"
                 alt="Logo"
                 width={150}
                 height={150}
                 className="absolute top-12 left-12 bg-lbblue w-[100px] md:w-[110px] lg:w-[140px] h-auto object-contain"
               />
               </Link>
       <EmailConfirmedBird/>
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          <h2 className="text-3xl font-bold text-lbtext mb-4 text-left w-2/4">
            Your registration has been confimed.
          </h2>

          <p className="text-lg font-bold text-lbtext mb-4  text-left w-2/4">
            Please now sign in to start using Little Birdie
          </p>
          <Link href={"/sign-in"}>
            <button className="w-78 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbtext text-white cursor-pointer hover:bg-lbgreen transition duration-300">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
