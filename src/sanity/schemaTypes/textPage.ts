import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const textPage = defineType({
	name: "textpage",
	title: "Text page",
	type: "document",
	icon: DocumentTextIcon,
	fields: [
		defineField({
			name: "title",

			type: "string",
			description: "Name of the page - ie 'Terms & Conditions'",
			validation: (Rule) => Rule.required().error("Title is required"),
		}),

		defineField({
			name: "textContent",
			title: "Text content",
			description: "The text content you wish to add",
			type: "blockContent",
			validation: (Rule) => Rule.required().error("Text is required"),
		}),
	],
});
