"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type SidebarItemProps = {
  iconName: string;
  label: string;
  active: boolean;
};

export default function SidebarItem({ iconName, label, active }: SidebarItemProps) {
  const [hover, setHover] = useState(false);

  const imageSrc = hover || active
    ? `/images/sidebar/green/${iconName}`
    : `/images/sidebar/${iconName}`;

  const baseClasses =
    "p-6 flex flex-col items-center justify-center text-lg cursor w-full border-1 border-r-1 border-lbgreen duration-300 ease-in-out";
  const activeOrHoverStyles = active
    ? "bg-white text-lbgreen"
    : "text-white hover:bg-white hover:text-lbgreen";

  return (
    <Link
      href={label === "Home" ? "/dashboard" : `/dashboard/${label.toLowerCase()}`}
      className="m-0 cursor-pointer"
    >
      <div
        className={`${baseClasses} ${activeOrHoverStyles}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image src={imageSrc} alt={label} width={30} height={30} />
        {label}
      </div>
    </Link>
  );
}