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
        <Button variant="link">
          <Info color="#00B1C4" size="28" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">{children}</HoverCardContent>
    </HoverCard>
  );
}
