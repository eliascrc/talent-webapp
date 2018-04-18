export class CapabilityLevel {
	name: string;
	hierarchyPosition: number;
	
	constructor(capabilityLevel: any) {
		this.name = capabilityLevel.name;
		this.hierarchyPosition = capabilityLevel.hierarchyPosition;
	}
} 