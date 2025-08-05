"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext/UserProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logOut } from "@/actions/logOut";

export function DropdownMenuComponent() {
  const handleLogout = async () => {
    await logOut();         // server action clears cookies
    window.location.href = "/"; // client-side redirect
  };
  const { user } = useUser();

   const fullname = `${user?.givenName ?? ''} ${user?.familyName ?? ''}`.trim();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-lbtextdark gap-2 cursor-pointer hover:bg-gray-100 ease-in-out rounded-lg py-2 px-4">
         <p className={cn(fullname.length > 40 ? 'text-sm' : 'text-base')}>
  {fullname}
</p>

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 mx-4 z-300" align="start" side="bottom">
        <DropdownMenuLabel>
          <div className="w-full flex flex-row items-end-safe">
            <h3 className="text-3xl text-lbgreen block pb-4">Profile</h3>
            <Image
              src="/images/main/lbgraphic.png"
              alt="profile image"
              width={500}
              height={200}
              className="w-full h-auto object-contain block p-4"
            />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-gray-400">
            ACCOUNT
          </DropdownMenuLabel>
         <Link href="/dashboard/personal-details" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            
            <Image
              src={"/images/dropdownmenu/user.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Personal details
          </DropdownMenuItem>
          </Link>
           <Link href="/dashboard/subs" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            <Image
              src={"/images/dropdownmenu/link.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Subscription list
          </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/subs" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            <Image
              src={"/images/dropdownmenu/list.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Connected bank accounts
          </DropdownMenuItem>
          </Link>
        
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer" onClick={handleLogout}>
            <Image
              src={"/images/dropdownmenu/door-open.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-gray-400">
            SUPPORT
          </DropdownMenuLabel>
           <Link href="/dashboard/help" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            <Image
              src={"/images/dropdownmenu/buoy.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Help
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-gray-400">
            SOCIAL
          </DropdownMenuLabel>
         
          <Link href="https://www.facebook.com/LittleBirdieHQ/" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            <Image
              src={"/images/dropdownmenu/fb.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Follow us on facebook
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-gray-400">
            LEGAL
          </DropdownMenuLabel>
           <Link href="/dashboard/terms-conditions" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            <Image
              src={"/images/dropdownmenu/file.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Terms & Conditions
          </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/privacy-policy" className="cursor-pointer">
          <DropdownMenuItem className="text-lg flex items-center cursor-pointer">
            <Image
              src={"/images/dropdownmenu/file.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Privacy Policy
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
