import {User} from './User';
import {Organization} from './Organization';
import {Skill} from './Skill';
import {ProfilePicture} from '@model/ProfilePicture';
import {ProjectPositionHolder} from '@model/ProjectPositionHolder';
import {Feedback} from '@model/Feedback';
import {EmergencyContact} from '@model/EmergencyContact';
import {LeadPosition} from '@model/LeadPosition';
import {PreviousJob} from '@model/PreviousJob';
import {JobPosition} from '@model/JobPosition';

/**
 * Class that represents a Technical Resource within the Talent system. It contains the technical resource
 * organization, profile picture, skills, feedback and other important information for Talent.
 * It also contains the information inherited from User class.
 *
 * @author Elías Calderón
 */
export class TechnicalResource extends User {
  profilePicture: ProfilePicture;
  organization: Organization;
  skills: Set<Skill>;
  projectPositions: Set<ProjectPositionHolder>;
  feedbackMade: Set<Feedback>;
  feedbackGiven: Set<Feedback>;
  timeZone: String;
  emergencyContacts: Set<EmergencyContact>;
  levelAssessmentTimeGap: number;
  lastLevelAssessment: Date;
  lastPerformanceReview: Date;
  isAdministrator: boolean;
  leadPositions: Set<LeadPosition>;
  description: string;
  previousJobs: Set<PreviousJob>;
  jobPosition: JobPosition;

  constructor(technicalResource: any) {
    super(technicalResource);

    this.profilePicture = new ProfilePicture(technicalResource.profilePicture);
    this.organization = new Organization(technicalResource.organization);

    this.skills = new Set();
    for (let skill of technicalResource.skills)
      this.skills.add(new Skill(skill));

    this.projectPositions = new Set();
    for (let position of technicalResource.projectPositions)
      this.projectPositions.add(new ProjectPositionHolder(position));

    this.feedbackMade = new Set();
    for (let feedback of technicalResource.feedbackMade)
      this.feedbackMade.add(new Feedback(feedback));

    this.feedbackGiven = new Set();
    for (let feedback of technicalResource.feedbackGiven)
      this.feedbackGiven.add(new Feedback(feedback));

    this.timeZone = technicalResource.timeZone;

    this.emergencyContacts = new Set();
    for (let contact of technicalResource.emergencyContacts)
      this.emergencyContacts.add(new EmergencyContact(contact));

    this.levelAssessmentTimeGap = technicalResource.levelAssessmentTimeGap;
    this.lastLevelAssessment = new Date(technicalResource.lastLevelAssessment.getTime());
    this.lastPerformanceReview = new Date(technicalResource.lastPerformanceReview.getTime());
    this.isAdministrator = technicalResource.isAdministrator;

    this.leadPositions = new Set();
    for (let leadPosition of technicalResource.leadPositions)
      this.leadPositions.add(new LeadPosition(leadPosition));

    this.description = technicalResource.description;

    this.previousJobs = new Set();
    for (let previousJob of technicalResource.previousJobs)
      this.previousJobs.add(new PreviousJob(previousJob));

    this.jobPosition = new JobPosition(technicalResource.jobPostion);

  }
}
