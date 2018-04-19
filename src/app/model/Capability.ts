import { CapabilityLevel } from './CapabilityLevel';

export class Capability {
	name: string;
	levelHierarchy: Set<CapabilityLevel>;
	
	constructor(capability: any) {
		this.name = capability.name;
		
		this.levelHierarchy = new Set();
		for(let capabilityLevel of capability.levelHierarchy) this.levelHierarchy.add(new CapabilityLevel(capabilityLevel));
	}
}