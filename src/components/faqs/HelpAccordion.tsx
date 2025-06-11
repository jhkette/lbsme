import {

  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PortableText} from "next-sanity";

type AccordionProps = {
  question: string;
  answer: React.ReactNode
};

export default function HelpAccordion({ question, answer }: AccordionProps) {

  return <section>
    <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg text-lb-gray">
            {question}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
            <p>
            {answer}
            </p>
          
          </AccordionContent>
        </AccordionItem>
        
        
  </section>;
}
