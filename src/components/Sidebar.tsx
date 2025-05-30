"use client"
import Image from 'next/image'
export default function Sidebar() {
  return (
    <div className='bg-lbgreen w-36 h-dvh flex flex-col'>
        <nav>
            <ul className='flex flex-col justify-center '>
                   <li className='p-6 flex flex-col items-center justify-center text-lbgreen text-lg cursor w-full bg-white' onClick={() => {}}>
                    <Image src="/Homegreen.svg" alt="list" width="36" height="36" />Home</li>
                <li className='p-6 flex flex-col items-center justify-center text-white text-lg cursor w-full hover:bg-white' onClick={() => {}}>
                    <Image src="/List.svg" alt="list" width="36" height="36" className='bg-lbgreen'/>Subs</li>
                <li className='p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white' onClick={() => {}}>
                    <Image src="/Activity.svg" alt="list" width="36" height="36"/>
                    Analytics</li>
                <li className='p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white' onClick={() => {}}>
                       <Image src="/Dollar.svg" alt="list" width="36" height="36"/>
                    Payments</li>
                <li className=' p-6 flex flex-col items-center justify-center text-white text-lg cursor hover:bg-white' onClick={() => {}}>
                         <Image src="/Tag.svg" alt="list" width="36" height="36"/>
                    Marketplace</li>
            </ul>
        </nav>
    </div>
  )
}
