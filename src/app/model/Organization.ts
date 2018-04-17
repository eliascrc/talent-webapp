import { OrganizationState } from './OrganizationState';
import { Project } from './Project';
import { TechnicalResource } from './TechnicalResource';
import { TechnicalManager } from './TechnicalManager';

export class Organization {
	uniqueIdentifier : string;
	name : string;
	twoStepVerification : boolean;
	totalUsers : number;
	domain : string;
	state : OrganizationState;
	projects : Set<Project>;
	resources : Set<TechnicalResource>;
	technicalManagers : Set<TechnicalManager>;
	
	
	constructor(organization : any) {
		this.uniqueIdentifier = organization.uniqueIdentifierame;
		this.name = organization.name;
		this.twoStepVerification = organization.twoStepVerification;
		this.totalUsers = organization.totalUsers;
		this.domain = organization.domain;
		this.state  = organization.state;
			
		this.projects = new Set(organization.projects);
			
		this.resources = new Set(organization.resources);
			
		this.technicalManagers = new Set(organization.technicalManagers);	
	}
}