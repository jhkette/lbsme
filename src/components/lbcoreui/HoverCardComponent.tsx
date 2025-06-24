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
        <Button variant="link" className="">
          <Info color="#00B1C4" size={80} className="size-[24px]" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">{children}</HoverCardContent>
    </HoverCard>
  );
  
}
