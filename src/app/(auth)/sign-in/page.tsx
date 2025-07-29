import Image from "next/image";
import Login from "@/components/forms/Login";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full h-screen relative">
        <Image
         src="/images/main/lbsmelogo.svg"
          alt="Logo"
          width={150}
          height={150}
          className="absolute top-12 left-12 bg-lbblue w-[100px] md:w-[110px] lg:w-[140px] h-auto object-contain"
        />
        <div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2">
           <h1 className="text-3xl/10 font-bold text-lbtext mb-4 px-12 py-4 text-center w-[70%] ">
            Subscriptions managed, Money Saved, Life Simplified
          </h1>
          
          <div>
          <Image
            src="/images/home/Bird.svg"
            alt="Bird"
            width={410}
            height={410}
            className="mx-12 w-[340px] md:w-[390px] h-auto object-contain"
          />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          
          <h2 className="text-2xl font-bold text-lbtext mb-4 px-12 text-center">
            Log into your account
          </h2>
          <Login />
       
        </div>
      </div>
    </div>
  );
}
