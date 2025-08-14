import Image from "next/image";
import ConfirmEmail from "@/components/forms/ConfirmEmail";
import BirdConfirmAccount from "@/components/auth/BirdConfirmAccount";
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
               <BirdConfirmAccount/>
    
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          
          <h2 className="text-3xl font-bold text-lbtext mb-4 text-left w-2/4">
            Email confirmation
          </h2>
         
            <p className="text-lg font-bold text-lbtext mb-2  text-left w-2/4">
             We have just sent a confirmation email to your email address. Please enter
             the code to confirm your email.
          </p>
          
          <ConfirmEmail />
        
       
        </div>
      </div>
    </div>
  );
}
