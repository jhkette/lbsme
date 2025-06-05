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
    <li
      className="p-6 flex flex-col items-center justify-center text-white text-lg cursor w-full border-1 border-r-1 border-lbgreen hover:bg-white hover:text-lbgreen ease-in-out"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image src={imageSrc} alt={label} width={32} height={32} />
      <Link href={`dashboard/${label.toLowerCase()}`}>{label}</Link>
    </li>
  );
}