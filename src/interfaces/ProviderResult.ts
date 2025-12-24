export interface ProviderResult {
	__typename?: "ProviderResult";
	providerId: string;
	displayName: string;
	icon?: string | null | undefined;
	regions: string[]; // e.g., ["GBR"]
	maintenanceStatus: boolean;
}
