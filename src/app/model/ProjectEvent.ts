import {BasicEntity} from '@model/BasicEntity';
import {Project} from '@model/Project';
import {ProjectEventType} from '@model/ProjectEventType';

/**
 * Class that represents a project event within the Talent system.
 * It contains the event's dates, eventType, project and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class ProjectEvent extends BasicEntity {
  startDate: Date;
  endDate: Date;
  eventType: ProjectEventType;
  project: Project;

  constructor(projectEvent: ProjectEvent) {
    super(projectEvent);
    this.startDate = projectEvent.startDate;
    this.endDate = projectEvent.endDate;
    this.eventType = projectEvent.eventType;
    this.project = projectEvent.project;
  }
}
