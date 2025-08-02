'use client';

import { useEffect, useState, ReactNode } from "react";
// import AppDownloadModal from "./AppDownloadModal"; // your modal component

export default function MobilePromptProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isMobile = () => {
      if (typeof navigator === "undefined") return false;
      const ua = navigator.userAgent || "";
      return /android|iphone|ipad|ipod/i.test(ua);
    };

    if (isMobile()) {
      // optionally check if user already dismissed the modal
      const dismissed = localStorage.getItem("dismissedAppPrompt");
      if (!dismissed) setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem("dismissedAppPrompt", "true");
  };

  return (
    <>
      {children}
      {/* {showModal && <AppDownloadModal onClose={handleClose} />} */}
    </>
  );
}