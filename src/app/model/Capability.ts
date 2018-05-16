import { CapabilityLevel } from './CapabilityLevel';

export class Capability {
	name: string;
	levelHierarchy: Set<CapabilityLevel>;
	
	constructor() {
	}
}