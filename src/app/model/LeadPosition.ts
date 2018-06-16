import {BasicEntity} from '@model/BasicEntity';
import {Project} from '@model/Project';
import {TechnicalResource} from '@model/TechnicalResource';

/**
 * Class that represents a lead position within the Talent system.
 * It contains the lead's start date, end date, active flag, the project, associated lead
 * and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class LeadPosition extends BasicEntity {
  startDate: Date;
  endDate: Date;
  active: boolean;
  project: Project;
  lead: TechnicalResource;

  constructor(leadPosition: any) {
    super(leadPosition);
    this.startDate = new Date(leadPosition.startDate.getTime());
    this.endDate = new Date (leadPosition.endDate.getTime());

    this.active = leadPosition.active;
    
    this.project = new Project(leadPosition.project);
    this.lead = new TechnicalResource(leadPosition.lead);
  }
}
