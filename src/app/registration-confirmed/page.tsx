"use client"
import Image from "next/image";
import Link from "next/link"
import {useUserSignup} from "@/contexts/UserCredentials/UserSignUpContext";
import { useEffect } from "react";
export default function Page() {

     const { clearUserCredentials } = useUserSignup();


     useEffect(() => {
        clearUserCredentials()
     },[])

  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full h-screen relative">
         <Image
                 src="/images/main/lbtext.svg"
                 alt="Logo"
                 width={150}
                 height={150}
                 className="absolute top-12 left-12 bg-lbblue w-[100px] md:w-[110px] lg:w-[140px] h-auto object-contain"
               />
        <div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2">
          <h1 className="text-3xl font-bold text-lbtext mb-4 px-12 text-center w-[90%]">
            The UK&apos;s top subscription & bill management app
          </h1>
          <div>
          <Image
        
         src="/images/main/emailconfirmed.svg"
            alt="Bird"
            width={250}
            height={250}
            className="mx-12 w-[200px] md:w-[250px] mt-2 h-auto object-contain"
          />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          
          <h2 className="text-3xl font-bold text-lbtext mb-4 text-left w-2/4">
            Your registration has been confimed.
          </h2>
         
            <p className="text-lg font-bold text-lbtext mb-4  text-left w-2/4">
             Please now sign in to start using Little Birdie
          </p>
          <Link href={"/sign-in"}>
           <button
        
        className="w-78 p-3 shadow-lg rounded-lg my-4 text-lg bg-lbtext text-white cursor-pointer hover:bg-lbgreen transition duration-300"
      >
        Sign in
      </button>
      </Link>
        
       
        </div>
      </div>
    </div>
  );
}
