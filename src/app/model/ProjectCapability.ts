import { ProjectPosition } from './ProjectPosition';
import { Project } from './Project';

export class ProjectCapability {
	currentProjectPosition: ProjectPosition; 
	projectPositionHistory: Set<ProjectPosition>;
	project: Project;
	
	constructor(projectCapability: any) {
		this.currentProjectPosition = new ProjectPosition(projectCapability.currentProjectPosition);
		this.project = new Project(projectCapability.project);
		
		this.projectPositionHistory = new Set();
		for(let projectPosition of projectCapability.projectPositionHistory) this.projectPositionHistory.add(new ProjectPosition(projectPosition));
	}
}