export class Position {
	organizationCapabilityLevel : OrganizationCapabilityLevel;
	technicalResource : TechnicalResource;
	
	constructor(position : any) {
		this.organizationCapabilityLevel = position.organizationCapabilityLevel;
		this.technicalResource = position.technicalResource;
	}
}