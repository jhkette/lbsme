import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full h-screen relative">
        <Image
          src="./lbtext.svg"
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
            src="./images/home/Bird.svg"
            alt="Bird"
            width={410}
            height={410}
            className="mx-12 w-[370px] md:w-[410px] h-auto object-contain"
          />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          
          <h2 className="text-4xl font-bold text-lbtext mb-4 px-12 text-center">
            Welcome to <span className="text-lbgreen">Little Birdie</span>
          </h2>
           <p className="text-xl font-bold text-lbtext mb-4 px-12 text-center">
            Sign up to start saving
          </p>
          <div className="flex flex-col gap-4">
                <Link href={"/register"}>
          <button className="w-96 p-3 shadow-lg font-semibold rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer 
          hover:bg-lbtext transition duration-300">
            Get Started
       </button>
       </Link>
       <Link href={"/sign-up"}>
       <button className="w-96 p-3 shadow-lg border-2 border-lbdarkblue rounded-lg my-4 text-lg bg-white text-lbtext  cursor-pointer 
          hover:bg-lbtext hover:text-white transition duration-300">
            I already have an account
       </button>
       </Link>
       </div>
        </div>
      </div>
    </div>
  );
}
