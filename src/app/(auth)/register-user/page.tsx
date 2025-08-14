import Image from "next/image";
import RegisterUser from "@/components/forms/RegisterUser";
import BirdLead from "@/components/auth/BirdLead";
import Link from "next/link";
export default function Page() {
  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full min-h-screen relative">
         <Link href={"/"} className="cursor-pointer">
        <Image
         src="/images/main/lbsmelogo.svg"
          alt="Logo"
          width={150}
          height={150}
          className="absolute top-12 left-12 bg-lbblue w-[100px] md:w-[110px] lg:w-[140px] h-auto object-contain"
        />
        </Link>
        <BirdLead/>
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          <div className="w-2/4 mt-4">
          <h2 className="text-4xl font-bold text-lbtext mb-4 py-1 text-left">
            Sign Up
          </h2>
          <p className="text-2xl font-bold text-lbtext mb-4 py-1 text-left">Enter your personal details</p>
          </div>
          <RegisterUser />
       
        </div>
      </div>
    </div>
  );
}
