"use server";
import axios, { AxiosError } from "axios";

export interface CompanyDetails {
	title: string;
	address_snippet: string;
	company_number: string;
}

export interface CompanyResponseData {
	items: CompanyDetails[];
}

export const searchCompanyName = async (searchTerm: string) => {
	try {
		const { data } = await axios.get<CompanyResponseData>(
			"https://api.company-information.service.gov.uk/search?q=" + searchTerm,
			{
				headers: {
					Authorization: process.env.COMPANY_SEARCH_AUTHORIZATION,
				},
			},
		);

		return data;
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(axiosError.message);
	}
};
