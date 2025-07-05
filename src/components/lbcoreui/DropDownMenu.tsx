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

import { logOut } from "@/actions/logOut";

export function DropdownMenuComponent() {
  const handleLogout = async () => {
    await logOut();         // server action clears cookies
    window.location.href = "/"; // client-side redirect
  };
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 ease-in-out rounded-lg py-2 px-4">
          {user?.givenName} {user?.familyName}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 mx-4" align="start" side="bottom">
        <DropdownMenuLabel>
          <div className="w-full flex flex-row items-end-safe">
            <h3 className="text-3xl text-lbgreen block pb-4">Profile</h3>
            <Image
              src="/lbgraphic.png"
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

          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/user.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Personal details
          </DropdownMenuItem>

          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/link.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Subscription list
          </DropdownMenuItem>
      
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
          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/buoy.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Help
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-gray-400">
            SOCIAL
          </DropdownMenuLabel>
          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/user-plus.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Reccomend a friend
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/fb.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Follow us on facebook
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-gray-400">
            LEGAL
          </DropdownMenuLabel>
          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/file.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Terms & Conditions
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg flex items-center">
            <Image
              src={"/images/dropdownmenu/file.svg"}
              height={25}
              width={25}
              alt="user icon"
              className="inline-block mr-4"
            />
            Privacy Policy
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
