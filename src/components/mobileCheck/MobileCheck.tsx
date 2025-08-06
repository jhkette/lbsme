'use client';

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function MobileCheck({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isMobile = () => {
      if (typeof navigator === "undefined") return false;
      const ua = navigator.userAgent || "";
      return /android|iphone|ipad|ipod/i.test(ua);
    };

    if (isMobile()) {
      // optionally check if user already dismissed the modal
     
    }
  }, []);

  

  return (
    <>
      {children}
   
    </>
  );
}