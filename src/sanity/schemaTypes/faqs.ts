import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const faqs = defineType({
  name: "FAQs",
  title: "Frequently Asked Questions",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "faqQuestion",
      title: "FAQ Question",
      type: "string",
      description: "Name of the deal i.e, Sky Full Fibre 150",
      validation: (Rule) => Rule.required().error("faq question name is required"),
    }),
   

    defineField({
      name: "faqAnswer",
      title: "FAQ Answer",
      description: "Answer to the FAQ question",
      validation: (Rule) => Rule.required().error("FAQ answer is required"),
      type: "blockContent",
    }),
   
  ],
});
