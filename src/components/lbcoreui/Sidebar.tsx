"use client";
import Image from "next/image";
export default function Sidebar() {
  return (
    <div className="bg-lbgreen w-32 h-dvh flex flex-col">
      <nav>
        <ul className="flex flex-col min-h-[750px] justify-between">
          <div>
          <li
            className="p-6 flex flex-col items-center justify-center text-lbgreen text-lg cursor w-full bg-white ease-in-out"
            onClick={() => {}}
          >
            <Image src="/Homegreen.svg" alt="list" width="32" height="32" />
            Home
          </li>
          <li
            className="p-6 flex flex-col items-center justify-center text-white text-lg cursor w-full hover:bg-white ease-in-out"
            onClick={() => {}}
          >
            <Image
              src="/List.svg"
              alt="list"
              width="32"
              height="32"
              className="bg-lbgreen"
            />
            Subs
          </li>
          <li
            className="p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white ease-in-out"
            onClick={() => {}}
          >
            <Image src="/Activity.svg" alt="list" width="32" height="32" />
            Analytics
          </li>
          <li
            className="p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white ease-in-out"
            onClick={() => {}}
          >
            <Image src="/Dollar.svg" alt="list" width="32" height="32" />
            Payments
          </li>
          <li
            className=" p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white ease-in-out "
            onClick={() => {}}
          >
            <Image src="/Tag.svg" alt="list" width="32" height="32" />
            Marketplace
          </li>
          </div>
          <div className="" >
           <li
            className=" p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white ease-in-out "
            onClick={() => {}}
          >
            <Image src="/images/sidebar/help.svg" alt="list" width="32" height="32" />
           Help
          </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
