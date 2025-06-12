import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_QUERYResult } from "@/interfaces/FAQQueryResult";
import { PortableText } from "@portabletext/react"; 
import "@/styles/faqstyles.css"

export default function AccordionWrapper({ faqs }: { faqs: FAQ_QUERYResult }) {
  return (
    <Accordion type="single" collapsible className="w-full text-lg">
      {faqs.map((faq) => (
        <AccordionItem key={faq._id} value={faq._id}>
          <AccordionTrigger className="text-lg text-lbtextdark">
            {faq.faqQuestion}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lbtextdark text-balance text-lg">
            <div className="faq-rich-text">
            <PortableText value={faq.faqAnswer} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}