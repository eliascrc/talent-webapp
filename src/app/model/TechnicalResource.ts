import { User } from './User';
import { Organization } from './Organization';
import { TechnicalManager } from './TechnicalManager';
import { Skill } from './Skill';
import { ProjectPosition } from './ProjectPosition';

export class TechnicalResource extends User {
	isAdministrator : boolean;
	lastLevelAssessment : Date;
	lastPerformanceReview : Date;
	organization : Organization;
	skills : Set<Skill>;
	projectPositions : Set<ProjectPosition>;
	technicalManager : TechnicalManager;
	timeZone : String;
	levelAssessmentTimeGap : number;
	
	constructor(technicalResource : any) {
		super(technicalResource);
		this.isAdministrator = technicalResource.isAdministrator;
		this.lastLevelAssessment = technicalResource.lastLevelAssessment;
		this.lastPerformanceReview = technicalResource.lastPerformanceReview;
		this.organization = technicalResource.organization;
		this.skills = new Set(technicalResource.skills);
		this.projectPositions  = new Set(technicalResource.projectPositions );
		this.technicalManager = technicalResource.technicalManager;
		this.levelAssessmentTimeGap = technicalResource.levelAssessmentTimeGap;
		this.timeZone = technicalResource.timeZone;
	}
}