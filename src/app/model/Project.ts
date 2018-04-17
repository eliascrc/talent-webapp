import { ProjectCapability } from './ProjectCapability';

export class Project {
	name : string;
	startDate : Date;
	endDate : Date;
	projectCapabilities : Set<ProjectCapability>;
	
	constructor(project : any) {
		this.name = project.name;
		this.startDate = project.startDate;
		this.endDate = project.endDate;
		
		this.projectCapabilities =  new Set(project.projectCapabilities);
	}
}