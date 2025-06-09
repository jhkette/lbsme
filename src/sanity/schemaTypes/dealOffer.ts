import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const dealOffer = defineType({
  name: "dealOffer",
  title: "Deal Offer",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "dealName",
      type: "string",
      description: "Name of the deal i.e, Sky Full Fibre 150",
      validation: (Rule) => Rule.required().error("Deal name is required"),
    }),
    defineField({
      name: "dealType",
      type: "string",
      title: "Deal Type",
      validation: (Rule) => Rule.required().error("Deal type is required"),
      description:
        "Is this a switch and save or price comparison feature?",
      options: {
        list: [
          { title: "Special Deals & Trials", value: "special deals" },
          { title: "Switch & Save", value: "switch and save" },
        ],

        layout: "dropdown", // Optional: can be "dropdown" instead
      },
    }),

    defineField({
      name: "dealGenre",
      type: "string",
      title: "Deal Genre",
      description: "Is this boradband, insurance or energy?",
      validation: (Rule) => Rule.required().error("Deal genre is required"),
      options: {
        list: [
          { title: "Broadband", value: "broadband" },
          { title: "Insurance", value: "insurance" },
          { title: "Energy", value: "energy" },
          { title: "Services", value: "services" },
          { title: "Software", value: "software" },
          { title: "Finance", value: "finance" },
        ],
        layout: "dropdown", // Optional: can be "dropdown" instead
      },
    }),

    defineField({
      name: "category",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "blockContent",
    }),
    defineField({
      name: "dealImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "link",
      title: "Link to deal",
      type: "url",
      description: "Link to the deal page if available",
    }),
  ],
});
