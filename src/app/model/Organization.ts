import { OrganizationState } from './OrganizationState';
import { Project } from './Project';
import { TechnicalResource } from './TechnicalResource';
import { TechnicalManager } from './TechnicalManager';

export class Organization {
	uniqueIdentifier: string;
	name: string;
	twoStepVerification: boolean;
	totalUsers: number;
	domain: string;
	state: OrganizationState;
	projects: Set<Project>;
	resources: Set<TechnicalResource>;
	technicalManagers: Set<TechnicalManager>;
	
	
	constructor() {
	}
}