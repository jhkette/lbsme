"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function MobileCheck({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const isMobile = () => {
			if (typeof navigator === "undefined") return false;
			const ua = navigator.userAgent || "";
			return /android|iphone|ipad|ipod/i.test(ua);
		};

		// Small timeout to prevent flash of content
		const timeout = setTimeout(() => {
			if (isMobile()) {
				router.push("/mobile-redirect");
			} else {
				setIsChecking(false);
			}
		}, 100); 

		return () => clearTimeout(timeout);
	}, [router]);

	// Don't render children until we've checked for mobile
	if (isChecking) {
		return null; 
	}

	return <>{children}</>;
}
