"use client";
import { BlurProvider } from "@/contexts/BlurContext/BlurContext";

export default function Layout({ children }: { children: React.ReactNode }) {

	return (
		<BlurProvider>
            {children}
        </BlurProvider>
	);
}
