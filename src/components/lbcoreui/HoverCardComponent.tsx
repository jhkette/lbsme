import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

type HoverCardComponentProps = React.PropsWithChildren<{}>;

export default function HoverCardComponent({
  children,
}: HoverCardComponentProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="cursor-pointer">
          <Info color="#A9A9A9" size={80} className="size-[24px]" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 mr-24">{children}</HoverCardContent>
    </HoverCard>
  );

}
