export class Capability {
	name : string;
	levelHierarchy : Array<CapabilityLevel>;
	
	constructor(capability : any) {
		this.name = capability.name;
		if(capability.levelHierarchy) 
			this.levelHierarchy = Object.assign([], capability.levelHierarchy);
	}
}