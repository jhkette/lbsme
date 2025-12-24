import { PortableTextBlock } from "@portabletext/types";
// puttings this here as i am having some problems generating it.
export type FAQ_QUERYResult = Array<{
	_id: string;
	faqQuestion: string;
	faqAnswer: PortableTextBlock[];
	tag: string;
}>;

export type Deal = {
	// Add other properties as needed based on your deal structure
	[key: string]: any;
};
