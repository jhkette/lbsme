"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext/UserProvider";
export function DropdownMenuComponent() {

  const { user } = useUser();
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className="flex items-center mt-2 gap-2 cursor-pointer hover:bg-lblgreen ease-in-out rounded-lg py-2 px-4">
          {user?.givenName} {user?.familyName}
          <Image
            src="/images/header/chevron-down.svg"
            alt="profile image"
            width={25}
            height={25}
            className="object-contain"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 mr-4" align="start" side="bottom">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-lg">
            Personal details
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg">
            Connected bank accounts
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg">
            Subscription list
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-lg">Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="text-lg">Email</DropdownMenuItem>
                <DropdownMenuItem className="text-lg">Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-lg">More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="text-lg">
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-lg">GitHub</DropdownMenuItem>
        <DropdownMenuItem className="text-lg"> Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-lg">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
