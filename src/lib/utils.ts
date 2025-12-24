import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(word: string): string {
	const finalWord = word.charAt(0).toUpperCase() + word.slice(1);
	return finalWord;
}

export function isNumeric(str: string | number): boolean {
	if (typeof str != "string") return false; // we only process strings!
	return (
		!isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	); // ...and ensure strings of whitespace fail
}
