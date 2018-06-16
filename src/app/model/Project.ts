import {LeadPosition} from '@model/LeadPosition';
import {CapabilityLevel} from '@model/CapabilityLevel';
import {ProjectPosition} from '@model/ProjectPosition';
import {Organization} from '@model/Organization';
import {Feedback} from '@model/Feedback';
import {BasicEntity} from '@model/BasicEntity';
import {ProjectEvent} from '@model/ProjectEvent';

/**
 * Class that represents a project within the Talent system.
 * It contains the project name, description, dates, links, capabilities, lead history, status, timeline,
 * positions and capabilities and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Project extends BasicEntity {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  jiraLink: string;
  confluenceLink: string;
  versionControlLink: string;
  timeline: Set<ProjectEvent>;
  currentState: Set<ProjectEvent>;
  leadHistory: Set<LeadPosition>;
  projectCapabilities: Set<CapabilityLevel>;
  projectPositions: Set<ProjectPosition>;
  organization: Organization;
  resourcesFeedback: Set<Feedback>;

  constructor(project: any) {
    super(project);
    this.name = project.name;
    this.description = project.description;
    this.startDate = project.startDate;
    this.endDate = project.endDate;
    this.jiraLink = project.jiraLink;
    this.confluenceLink = project.confluenceLink;
    this.versionControlLink = project.versionControlLink;
    this.timeline = project.timeline;
    this.currentState = project.currentState;
    this.leadHistory = project.leadHistory;
    this.projectCapabilities = project.projectCapabilities;
    this.projectPositions = project.projectPositions;
    this.organization = project.organization;
    this.resourcesFeedback = project.resourcesFeedback;
  }
}
