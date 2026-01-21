"use client";

import Image from "next/image";
import BirdLead from "@/components/auth/BirdLead";
import Link from "next/link";

export default function Home() {
	

	return (
		<div className="w-full">
			<div className="flex flex-row bg-lbgray w-full h-screen relative">
				<Image
					src="/images/main/lbfinal.svg"
					alt="Logo"
					width={150}
					height={150}
					className="absolute top-12 left-12 bg-lbblue w-[100px] md:w-[110px] lg:w-[140px] h-auto object-contain"
				/>
				<BirdLead />
				<div className="flex flex-col items-center justify-center h-screen  w-1/2">
					<h2 className="text-4xl font-bold text-lbtext mb-4 px-12 text-center">
						Welcome to <span className="text-lbgreen">Little Birdie</span>
					</h2>
					<p className="text-xl font-bold text-lbtext mb-4 px-12 text-center">
						Sign up to start saving
					</p>
					<div className="flex flex-col gap-4">
						<Link href={"/register-user"}>
							<button
								className="w-92 p-3 shadow-lg font-semibold rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer 
          hover:bg-lbtext transition duration-300"
							>
								Get Started
							</button>
						</Link>
						<Link href={"/sign-in"}>
							<button
								className="w-92 p-3 shadow-lg border-1 border-lbdarkblue rounded-lg my-4 text-lg bg-white text-lbtext  cursor-pointer 
          hover:bg-lbtext hover:text-white transition duration-300"
							>
								I already have an account
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
