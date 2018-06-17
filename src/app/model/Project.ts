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
  currentState: ProjectEvent;
  leadHistory: Set<LeadPosition>;
  projectCapabilities: Set<CapabilityLevel>;
  projectPositions: Set<ProjectPosition>;
  organization: Organization;
  resourcesFeedback: Set<Feedback>;

  constructor(project: any) {
    super(project);
    this.name = project.name;
    this.description = project.description;

    this.startDate = new Date(project.startDate.getTime());
    this.endDate = new Date(project.endDate.getTime());

    this.jiraLink = project.jiraLink;
    this.confluenceLink = project.confluenceLink;
    this.versionControlLink = project.versionControlLink;
    
    this.timeline = new Set(); 
    for (let event of project.timeline)
      this.timeline.add(new ProjectEvent(event));
    
    this.currentState = new ProjectEvent(project.currentState);

    this.leadHistory = new Set();
    for(let lead of project.leadHistory)
      this.leadHistory.add(new LeadPosition(lead));

    this.projectCapabilities = new Set();
    for (let capability of project.projectCapabilities)
      this.projectCapabilities.add(new CapabilityLevel(capability));

    this.projectPositions = new Set();
    for(let position of project.projectPositions)
      this.projectPositions.add(new ProjectPosition(position));

    this.organization = new Organization(project.organization);
    
    this.resourcesFeedback = new Set();
    for(let feedback of project.resourcesFeedback)
      this.resourcesFeedback.add(new Feedback(feedback));
  }
}
