import {User} from './User';
import {Organization} from './Organization';
import {Skill} from './Skill';
import {ProfilePicture} from '@model/ProfilePicture';
import {ProjectPositionHolder} from '@model/ProjectPositionHolder';
import {Feedback} from '@model/Feedback';
import {EmergencyContact} from '@model/EmergencyContact';
import {LeadPosition} from '@model/LeadPosition';
import {PreviousJob} from '@model/PreviousJob';

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

  constructor(technicalResource: any) {
    super(technicalResource);
    this.profilePicture = technicalResource.profilePicture;
    this.organization = technicalResource.organization;
    this.skills = technicalResource.skills;
    this.projectPositions = technicalResource.projectPositions;
    this.feedbackMade = technicalResource.feedbackMade;
    this.feedbackGiven = technicalResource.feedbackGiven;
    this.timeZone = technicalResource.timeZone;
    this.emergencyContacts = technicalResource.emergencyContacts;
    this.levelAssessmentTimeGap = technicalResource.levelAssessmentTimeGap;
    this.lastLevelAssessment = technicalResource.lastLevelAssessment;
    this.lastPerformanceReview = technicalResource.lastPerformanceReview;
    this.isAdministrator = technicalResource.isAdministrator;
    this.leadPositions = technicalResource.leadPositions;
    this.description = technicalResource.description;
    this.previousJobs = technicalResource.previousJobs;
  }
}
