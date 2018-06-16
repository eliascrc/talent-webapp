import {Project} from './Project';
import {BasicEntity} from '@model/BasicEntity';
import {CapabilityLevel} from '@model/CapabilityLevel';
import {ProjectPositionHolder} from '@model/ProjectPositionHolder';
import {ProjectPositionStatus} from '@model/ProjectPositionStatus';

/**
 * Class that represents a Project position within the Talent system.
 * It contains the status, the total hours for the position, the capability, holder history, related project and
 * and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class ProjectPosition extends BasicEntity {
  projectPositionStatus: ProjectPositionStatus;
  totalHours: number;
  capability: CapabilityLevel;
  holderHistory: Set<ProjectPositionHolder>;
  project: Project;

  constructor(projectPosition: any) {
    super(projectPosition);
    this.projectPositionStatus = projectPosition.projectPositionStatus; // Enum
    this.totalHours = projectPosition.totalHours;

    this.capability = new CapabilityLevel(projectPosition.capability);
    
    this.holderHistory = new Set();
    for(let holder of projectPosition.holderHistory)
      this.holderHistory.add(new ProjectPositionHolder(holder));

    this.project = new Project(projectPosition.project);
  }
}
