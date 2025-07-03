import Image from "next/image";
import OpenBankingProvider from "@/components/openBanking/openBankingProvider";

export default function Openbanking() {
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
          <div>
            <Image
              src="./images/home/Bird.svg"
              alt="Bird"
              width={450}
              height={450}
              className="mx-12"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start h-screen  w-1/2 pt-24">
          <h2 className="text-4xl font-bold text-lbtext mb-4 px-12 text-center">
            Open Banking
          </h2>
          <p className="text-2xl font-bold text-lbtext mb-4 px-12 text-center w-128">
            Select your bank to connect to view your subscriptions
          </p>
          <OpenBankingProvider />
        </div>
        <div></div>
      </div>
    </div>
  );
}
