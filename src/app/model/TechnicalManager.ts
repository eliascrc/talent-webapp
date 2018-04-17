import { TechnicalResourceManager } from './TechnicalResourceManager';
import { TechnicalResource } from './TechnicalResource';
import { Skill } from './Skill';

export class TechnicalManager extends TechnicalResourceManager {
	
	/* requestedSkills does not have the same name as the backend model because
	it would conflict with the 'skills' property of base class TechnicalResource*/
	requestedSkills : Map<TechnicalResource, Set<Skill>>;
	managedResources : Set<TechnicalResource>;
	
	constructor(technicalManager : any) {
		super(technicalManager);
		this.requestedSkills = new Map(technicalManager.requestedSkills);
		this.managedResources = new Set(technicalManager.managedResources);
	}
}