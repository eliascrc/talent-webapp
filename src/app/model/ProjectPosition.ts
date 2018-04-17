import { Position } from './Position';
import { Project } from './Project';
import { ProjectCapability } from './ProjectCapability';

export class ProjectPosition extends Position {
	startDate : Date;
	endDate : Date;
	project : Project;
	reviewed : boolean;
	projectCapability : ProjectCapability;
	
	constructor(projectPosition : any) {
		super(projectPosition);
		this.startDate = projectPosition.startDate;
		this.endDate = projectPosition.endDate;
		this.project = projectPosition.project;
		this.reviewed = projectPosition.reviewed;
		this.projectCapability = projectPosition.projectCapability;
	}
}