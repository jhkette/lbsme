"use client";
import Image from 'next/image'
import Link from 'next/link';
import { DropdownMenuComponent } from './DropDownMenu';
function Header({ }) {
    const username = "Test user"; // Placeholder for username, can be replaced with actual user data
    return (
        <div className="h-24 w-full  border-b-1 border-cyan-500 flex items-center justify-between px-12 bg-white">
             <Link href="/dashboard" className="cursor-pointer">
            <div className="flex items-center justify-start  gap-2">
               
                <Image
                    src="/LBLogo.svg"
                    alt="Logo"
                    width={60}
                    height={35}
                    className="object-contain" />
                
                <Image
                    src="/lbtext.svg"
                    alt="Logo Text"
                    width={100}
                    height={35}
                    className="object-contain" />
                   
            </div>
             </Link>
            <div className="flex items-center justify-end gap-2">
                <Image
                    src="/User.svg"
                    alt="profile image"
                    width={35}
                    height={35}
                    className="object-contain" />
              
           <DropdownMenuComponent />

            </div>
        </div>
    )
}

export default Header