"use client";
import { useApolloClient } from "@apollo/client";
import { GetTrialsDocument } from "@/graphql/getTrials.generated";

type Deal = {
	[key: string]: any;
};

interface GetTrialsResponse {
	getTrials: {
		items: Deal[];
		nextToken?: string | null;
	};
}

interface FetchAllTrialsOptions {
	client: ReturnType<typeof useApolloClient>;
}

export async function fetchAllTrials(
	client: FetchAllTrialsOptions["client"],
): Promise<Deal[]> {
	const allItems: Deal[] = [];
	let nextToken: string | null | undefined = null;
	do {
		const { data }: { data: GetTrialsResponse } = await client.query({
			query: GetTrialsDocument,
			variables: { limit: 50, nextToken },
		});
		allItems.push(...data.getTrials.items);
		nextToken = data.getTrials.nextToken;
	} while (nextToken);
	return allItems;
}
