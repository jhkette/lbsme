"use client";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenuComponent } from "./DropDownMenu";
export default function HeaderDashboard({}) {
  
  return (
    <div className="h-24 w-full  border-b-1 border-cyan-500 flex items-center justify-between px-12 bg-white">
      <Link href="/dashboard" className="cursor-pointer">
        <div className="flex items-center justify-start gap-2">
        

          <Image
            src="/images/main/lbsmelogo.svg"
            alt="Logo Text"
            width={100}
            height={35}
            className="object-contain"
          />
        </div>
      </Link>
      <div className="flex items-center justify-end items-center gap-2 ">
        <Image
          src="/images/main/User.svg"
          alt="profile image"
          width={45}
          height={45}
          className="object-contain bg-gray-100 rounded-3xl p-2"
        />

        <DropdownMenuComponent />
      </div>
    </div>
  );
}


