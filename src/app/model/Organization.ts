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
	
	
	constructor(organization: any) {
		this.uniqueIdentifier = organization.uniqueIdentifierame;
		this.name = organization.name;
		this.twoStepVerification = organization.twoStepVerification;
		this.totalUsers = organization.totalUsers;
		this.domain = organization.domain;
		this.state  = organization.state; // enum
		
		this.projects = new Set();
		for(let project of organization.projects) this.projects.add(new Project(project));
		
		this.resources = new Set();
		for(let resource of organization.resources) this.resources.add(new TechnicalResource(resource));
		
		this.technicalManagers = new Set();
		for(let technicalManager of organization.technicalManagers) this.technicalManagers.add(new TechnicalManager(technicalManager));
	}
}