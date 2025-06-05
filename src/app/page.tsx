import Image from "next/image";
import Login from "@/components/forms/Login";
import SignInRedirect from "@/components/signin/signInRedirect";
export default function Home() {
  return (
    <div className="w-full">
      <div className="flex flex-row bg-lbgray w-full h-screen relative">
        <Image
          src="./lbtext.svg"
          alt="Logo"
          width={150}
          height={150}
          className="absolute top-12 left-12 bg-lbblue"
        />
        <div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2">
          <h1 className="text-3xl font-bold text-lbtext mb-4 px-12 text-center w-[90%]">
            The UK&apos;s top subscription & bill management app
          </h1>
          <Image
            src="./images/home/Bird.svg"
            alt="Bird"
            width={500}
            height={500}
            className="mx-12"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          <Image
            src="./images/home/imagelogo08.svg"
            alt="Logo"
            width={75}
            height={75}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-lbtext mb-4 px-12 text-center">
            Log into your account
          </h2>
          <Login />
          <SignInRedirect />
        </div>
      </div>
    </div>
  );
}
