import { ProjectPosition } from './ProjectPosition';
import { Project } from './Project';

export class ProjectCapability {
	currentProjectPosition : ProjectPosition; 
	projectPositionHistory : Set<ProjectPosition>;
	project : Project;
	
	constructor(projectCapability : any) {
		this.currentProjectPosition = projectCapability.currentProjectPosition;
		this.project = projectCapability.project;
		this.projectPositionHistory = new Set(projectCapability.projectPositionHistory);
	}
}