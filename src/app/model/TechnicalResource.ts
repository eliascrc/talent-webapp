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
	
	constructor(technicalResource: any) {
		super(technicalResource);
		this.isAdministrator = technicalResource.isAdministrator;
		this.lastLevelAssessment = new Date(technicalResource.lastLevelAssessment.getTime());
		this.lastPerformanceReview  = new Date(technicalResource.lastPerformanceReview.getTime());
		this.organization = new Organization(technicalResource.organization);
		
		this.skills = new Set();
		for(let skill of technicalResource.skills) this.skills.add(new Skill(skill));
		
		this.projectPositions = new Set();
		for(let projectPosition of technicalResource.projectPositions) this.projectPositions.add(new ProjectPosition(projectPosition));
		
		this.technicalManager = new TechnicalManager(technicalResource.technicalManager);
		this.timeZone = technicalResource.timeZone;
		this.levelAssessmentTimeGap = technicalResource.levelAssessmentTimeGap;
	}
}