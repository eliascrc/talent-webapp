import { Position } from './Position';
import { Project } from './Project';
import { ProjectCapability } from './ProjectCapability';

export class ProjectPosition extends Position {
	startDate: Date;
	endDate: Date;
	project: Project;
	reviewed: boolean;
	projectCapability: ProjectCapability;
	
	constructor(projectPosition: any) {
		super(projectPosition);
		
		this.startDate  = new Date(projectPosition.startDate.getTime());
		this.endDate = new Date(projectPosition.endDate.getTime());

		this.project = new Project(projectPosition.project);
		this.reviewed = projectPosition.reviewed;
		this.projectCapability = new ProjectCapability(projectPosition.projectCapability);
	}
}