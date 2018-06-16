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
    this.startDate = leadPosition.startDate;
    this.endDate = leadPosition.endDate;
    this.active = leadPosition.active;
    this.project = leadPosition.project;
    this.lead = leadPosition.lead;
  }
}
