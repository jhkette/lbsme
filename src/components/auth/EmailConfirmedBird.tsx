import Image from "next/image";

export default function EmailConfirmedBird() {
	return (
		<div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2">
			<Image
				src="/images/main/emailconfirmed.svg"
				alt="Bird"
				width={250}
				height={250}
				className="mx-12 w-[155px] md:w-[175px] mt-2 h-auto object-contain py-8"
			/>
			<h1 className="text-2xl/10 text-4xl/12 font-bold text-lbtext mb-4 px-12  text-center w-[85%] ">
				Subscriptions managed, Money Saved, Life Simplified
			</h1>

			<h2 className="text-lg/6 lg:text-xl/8 font-bold text-lbtext opacity-90 mb-4 px-12  text-center w-[70%]">
				View, Analyse, Switch or Cancel all your business subscriptions in one
				place saving you time and money
			</h2>
		</div>
	);
}
