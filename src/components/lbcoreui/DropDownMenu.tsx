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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center mt-2 gap-2 cursor-pointer hover:bg-lblgreen ease-in-out rounded-lg py-2 px-4">
          {user?.givenName} {user?.familyName}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 mx-4" align="start" side="bottom">
        <DropdownMenuLabel>
          <div className="w-full flex flex-row items-end-safe">
            <h3 className="text-2xl text-lbgreen block pb-4">Profile</h3>
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
        
          <DropdownMenuItem className="text-lg">
            Personal details
          </DropdownMenuItem>

          <DropdownMenuItem className="text-lg">
            Subscription list
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg">
            Saving history at glance
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-lg text-gray-400">
            Security
          </DropdownMenuLabel>
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
