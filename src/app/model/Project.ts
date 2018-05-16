import { ProjectCapability } from './ProjectCapability';

export class Project {
	name: string;
	startDate: Date;
	endDate: Date;
	projectCapabilities: Set<ProjectCapability>;
	
	constructor() {
	}
}