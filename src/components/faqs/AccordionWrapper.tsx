import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_QUERYResult } from "@/interfaces/FAQQueryResult";
import { PortableText } from "@portabletext/react"; // assuming you're using this

export default function AccordionWrapper({ faqs }: { faqs: FAQ_QUERYResult }) {
  return (
    <Accordion type="single" collapsible className="w-full text-lg">
      {faqs.map((faq) => (
        <AccordionItem key={faq._id} value={faq._id}>
          <AccordionTrigger className="text-lg text-lb-gray">
            {faq.faqQuestion}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
            <PortableText value={faq.faqAnswer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}