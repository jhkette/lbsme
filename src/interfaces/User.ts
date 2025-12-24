export interface UserInterface {
	username: string;
	email: string;
	emailVerified: boolean;
	familyName: string;
	givenName: string;
	phoneNumber?: string;
	postcode?: string;
	termsAndConditions?: boolean;
	accessToken?: string;
	refreshToken?: string;
}
