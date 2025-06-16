"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type SidebarItemProps = {
  iconName: string; // e.g., "Activity.svg"
  label: string;
};

export default function SidebarItem({ iconName, label }: SidebarItemProps) {
  const [hover, setHover] = useState(false);

  const imageSrc = hover
    ? `/images/sidebar/green/${iconName}`
    : `/images/sidebar/${iconName}`;

  return (
    <Link href={label ==="Home" ? "/dashboard":`/dashboard/${label.toLowerCase()}`} className="m-0">
    <div
      className="p-6 flex flex-col items-center justify-center text-white text-lg cursor m-0 w-full border-1 border-r-1 border-lbgreen hover:bg-white hover:text-lbgreen duration-300 ease-in-out"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image src={imageSrc} alt={label} width={30} height={30} />
      {label}
    </div>
    </Link>
  );
}