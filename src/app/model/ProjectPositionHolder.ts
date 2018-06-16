import {BasicEntity} from '@model/BasicEntity';
import {ProjectPosition} from '@model/ProjectPosition';
import {TechnicalResource} from '@model/TechnicalResource';

/**
 * Class that represents a Project position holder within the Talent system.
 * It contains the dates, the related position, if it has been already reviewed, the resource, the assigned hours,
 * if it's active and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class ProjectPositionHolder extends BasicEntity {
  startDate: Date;
  endDate: Date;
  projectPosition: ProjectPosition;
  reviewed: boolean;
  resource: TechnicalResource;
  assignedHours: number;
  active: boolean;

  constructor(projectPositionHolder: any) {
    super(projectPositionHolder);
    this.startDate = new Date(projectPositionHolder.startDate.getTime());
    this.endDate = new Date(projectPositionHolder.endDate.getTime());
    this.projectPosition = new ProjectPosition(projectPositionHolder.projectPosition);

    this.reviewed = projectPositionHolder.reviewed;
    
    this.resource = new TechnicalResource(projectPositionHolder.resource);
    
    this.assignedHours = projectPositionHolder.assignedHours;
    this.active = projectPositionHolder.active;
  }
}
