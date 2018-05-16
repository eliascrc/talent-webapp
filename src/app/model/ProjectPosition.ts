import { Position } from './Position';
import { Project } from './Project';
import { ProjectCapability } from './ProjectCapability';

export class ProjectPosition extends Position {
	startDate: Date;
	endDate: Date;
	project: Project;
	reviewed: boolean;
	projectCapability: ProjectCapability;
	
	constructor() {
		super();
	}
}