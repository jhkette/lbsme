import Image from "next/image";
export default function Home() {
  return (
    
      <div className="w-full">
        <div className="flex flex-row bg-lbgray w-full h-screen relative">
         
          <Image src="./lbtext.svg" alt="Logo" width={150} height={150} className="absolute top-12 left-12 bg-lbblue"  />
          <div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2">
          <h1 className="text-3xl font-bold text-lbtext mb-4 px-12 text-center">The UK&apos;s top subscription & bill management app</h1>
          <Image src="./images/home/Bird.svg" alt="Bird" width={500} height={500} className="mx-12" />
          </div>
          <div className="flex flex-col items-center justify-center h-screen  w-1/2">
           <Image src="./images/home/imagelogo08.svg" alt="Logo" width={75} height={75} className="mb-4"/>  
          <input type="text" placeholder="Enter your name" className="w-3/4 p-4 rounded-lg mb-4 text-lg border-1 border-black" />
          <input type="email" placeholder="Enter your email address" className="w-3/4 p-4 rounded-lg mb-4 text-lg border-1 border-black" />
          <input type="submit" value="Login" className="w-3/4 p-4 rounded-lg mb-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300" />
          </div>
        </div>

        </div>
    
  );
}
