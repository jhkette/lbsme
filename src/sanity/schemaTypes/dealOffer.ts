import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const dealOffer = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "dealName",
      type: "string",
    }),
   defineField({
  name: "dealType",
  type: "string",
  title: "Deal Type",
  options: {
    list: [
      { title: "Special Deals", value: "special deals" },
      { title: "Switch and Save", value: "switch and save" },
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
      title: "Project Links",
      type: "object",
      fields: [
        defineField({
          name: "code",
          type: "url",
          title: "Code Repository",
        }),
        defineField({
          name: "visit",
          type: "url",
          title: "Live Project",
        }),
      ],
    }),
  ],
});