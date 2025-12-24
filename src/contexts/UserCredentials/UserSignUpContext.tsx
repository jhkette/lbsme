"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { STORAGE_KEY } from "@/lib/consts";
export type UserCredentials = {
	given_name: string;
	family_name: string;
	email: string;
	terms_and_conditions: string;
	phoneNumber: string;
	companyDetails: {
		title: string;
		address_snippet: string;
		company_number: string;
	};
};

type SignupContextType = {
	userCredentials: UserCredentials | null;
	setUserCredentials: (data: UserCredentials) => void;
	clearUserCredentials: () => void;
	isLoading: boolean;
};

const UserSignupContext = createContext<SignupContextType | undefined>(
	undefined,
);

//Context used to store details in registration form
export const UserSignupProvider = ({ children }: { children: ReactNode }) => {
	const [userCredentials, setUserCredentialsState] =
		useState<UserCredentials | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	// Load from localStorage on initial mount
	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as UserCredentials;
				setUserCredentialsState(parsed);
			} catch (err) {
				// Clear corrupted data
				localStorage.removeItem(STORAGE_KEY);
				console.error("Error parsing user credentials from localStorage:", err);
			}
		}
		// used in components to ensure there is no 'race condition' between fecthing userCreds
		// and rerouting if they are not there
		setIsLoading(false);
	}, []);

	// Persist to localStorage when credentials change
	useEffect(() => {
		if (userCredentials) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(userCredentials));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, [userCredentials]);

	const setUserCredentials = (data: UserCredentials) => {
		setUserCredentialsState(data);
	};

	const clearUserCredentials = () => {
		setUserCredentialsState(null);
		localStorage.removeItem(STORAGE_KEY);
	};

	return (
		<UserSignupContext.Provider
			value={{
				userCredentials,
				setUserCredentials,
				clearUserCredentials,
				isLoading,
			}}
		>
			{children}
		</UserSignupContext.Provider>
	);
};

export const useUserSignup = () => {
	const context = useContext(UserSignupContext);
	if (!context) {
		throw new Error("useUserSignup must be used within a UserSignupProvider");
	}
	return context;
};
