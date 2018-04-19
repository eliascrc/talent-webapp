import { TechnicalResourceManager } from './TechnicalResourceManager';
import { TechnicalResource } from './TechnicalResource';
import { Skill } from './Skill';

export class TechnicalManager extends TechnicalResourceManager {
	
	/* requestedSkills does not have the same name as the backend model because
	it would conflict with the 'skills' property of base class TechnicalResource*/
	requestedSkills: Map<TechnicalResource, Set<Skill>>;
	managedResources: Set<TechnicalResource>;
	
	constructor(technicalManager: any) {
		super(technicalManager);
		
		// Deep copy the requestedSkills map by iterating each [TechnicalResource, Set<Skill>] pair
		this.requestedSkills = new Map();
		for(let [technicalResource, skills] of technicalManager.requestedSkills) {
			// For each pair, deep copy the Skill array
			let skillsCopy = new Set();
			for(let skill of skills) skillsCopy.add(new Skill(skill));
			
			// Copy the TechnicalResource
			let technicalResourceCopy = new TechnicalResource(technicalResource);
			
			// Add the copied pair to the new map
			this.requestedSkills.set(technicalResourceCopy, skillsCopy);
		}
		
		this.managedResources = new Set();
		for(let managedResource of technicalManager.managedResources) this.managedResources.add(new TechnicalResource(managedResource));
	}
}