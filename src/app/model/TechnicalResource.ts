import { User } from './User';
import { Organization } from './Organization';
import { TechnicalManager } from './TechnicalManager';
import { Skill } from './Skill';
import { ProjectPosition } from './ProjectPosition';

export class TechnicalResource extends User {
	isAdministrator: boolean;
	lastLevelAssessment: Date;
	lastPerformanceReview: Date;
	organization: Organization;
	skills: Set<Skill>;
	projectPositions: Set<ProjectPosition>;
	technicalManager: TechnicalManager;
	timeZone: String;
	levelAssessmentTimeGap: number;
	
	constructor() {
		super();
	}
}