import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center bg-lbgray w-full h-screen relative px-12">
        <Image
          src="/images/main/largebird.svg"
          alt="Bird"
          width={410}
          height={410}
          className="mx-12 w-[330px] md:w-[370px] h-auto object-contain"
        />
        <h1 className="text-2xl font-bold text-lbgreen mb-4 px-12 text-center w-full">
          This site is intended to be used on a desktop or laptop. Please
          download the app from the{" "}
          <Link className="text-lbtext hover:text-lbgreen" href={"#"}>
            App Store
          </Link>{" "}
          or{" "}
          <Link className="text-lbtext hover:text-lbgreen" href={"#"}>
            Google Play Store{" "}
          </Link>{" "}
          to continue.
        </h1>
      </div>
    </div>
  );
}
