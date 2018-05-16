import { ProjectPosition } from './ProjectPosition';
import { Project } from './Project';

export class ProjectCapability {
	currentProjectPosition: ProjectPosition; 
	projectPositionHistory: Set<ProjectPosition>;
	project: Project;
	
	constructor() {
		
	}
}