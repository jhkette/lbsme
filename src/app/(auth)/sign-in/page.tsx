import Image from "next/image";
import Login from "@/components/forms/Login";
import BirdLead from "@/components/auth/BirdLead";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full h-screen relative">
        <Link href={"/"} className="cursor-pointer">
        <Image
         src="/images/main/lbsmelogo.svg"
          alt="Logo"
          width={150}
          height={150}
          className="absolute top-12 left-12 bg-lbblue w-[100px] md:w-[110px] lg:w-[140px] h-auto object-contain"
        />
        </Link>
         <BirdLead />
        
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
