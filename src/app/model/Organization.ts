export class Organization {
	uniqueIdentifier : string;
	name : string;
	twoStepVerification : boolean;
	totalUsers : number;
	domain : string;
	state : OrganizationState;
	userAuthenticationMethod : UserAuthenticationMethod;
	capabilities : Array<OrganizationCapability>;
	skillCategories: Array<OrganizationCategorySkill>;
	projects : Array<Project>;
	resources : Array<TechnicalResource>;
	humanResourceManagers : Array<HumanResourceManager>;
	technicalManagers : Array<TechnicalManager>;
	
	
	constructor(organization : any) {
		this.uniqueIdentifier = organization.uniqueIdentifierame;
		this.name = organization.name;
		this.twoStepVerification = organization.twoStepVerification;
		this.totalUsers = organization.totalUsers;
		this.domain = organization.domain;
		this.state  = organization.state;
		this.userAuthenticationMethod = organization.userAuthenticationMethod;
		
		this.capabilities = Object.assign([], organization.capabilities);
		
		this.skillCategories = Object.assign([], organization.skillCategories);
			
		this.projects = Object.assign([], organization.projects);
			
		this.resources = Object.assign([], organization.resources);
			
		this.humanResourceManagers = Object.assign([], organization.humanResourceManagers);
			
		this.technicalManagers = Object.assign([], organization.technicalManagers);	
	}
}