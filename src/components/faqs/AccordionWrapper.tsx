"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HelpAccordion from "@/components/faqs/HelpAccordion";



import { FAQ_QUERYResult } from "@/sanity/types";


export default function AccordionWrapper({faqs}: { faqs: FAQ_QUERYResult }) {
    console.log(faqs);
  return (
    <Accordion type="single" collapsible className="w-full text-lg">
      <HelpAccordion question="test" answer="test" />
    </Accordion>
  );
}
