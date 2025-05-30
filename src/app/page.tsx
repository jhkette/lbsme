import Image from "next/image";
export default function Home() {
  return (
    
      <div className="w-full">
        <div className="flex flex-row bg-lbgray w-full h-screen relative">
         
          <Image src="./lbtext.svg" alt="Logo" width={150} height={150} className="absolute top-12 left-12 bg-lbblue"  />
          <div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2">
          <Image src="./Bird.svg" alt="Bird" width={500} height={500} className="mx-12" />
          </div>
          <div className="flex flex-col items-center justify-center h-screen  w-1/2">
          </div>
        </div>

        </div>
    
  );
}
