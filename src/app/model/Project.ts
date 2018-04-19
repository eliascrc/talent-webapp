import { ProjectCapability } from './ProjectCapability';

export class Project {
	name: string;
	startDate: Date;
	endDate: Date;
	projectCapabilities: Set<ProjectCapability>;
	
	constructor(project: any) {
		this.name = project.name;
		this.startDate  = new Date(project.startDate.getTime());
		this.endDate = new Date(project.endDate.getTime());
		
		this.projectCapabilities = new Set();
		for(let projectCapability of project.projectCapabilities) this.projectCapabilities.add(new ProjectCapability(projectCapability));
	}
}