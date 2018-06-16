import {BasicEntity} from '@model/BasicEntity';
import {TechnicalResource} from '@model/TechnicalResource';

/**
 * Class that represents the previous job of a Technical Resource within the Talent system.
 * It contains the job's organization name, a description, start and end date of the job.
 * It also contains the information inherited from BasicEntity class.
 *
 * @author Elias Calderón
 */
export class PreviousJob extends BasicEntity {
  organizationName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  technicalResource: TechnicalResource;

  constructor(previousJob: any) {
    super(previousJob);
    this.organizationName = previousJob.organizationName;
    this.description = previousJob.description;
    this.startDate = new Date(previousJob.startDate.getTime());
    this.endDate = new Date(previousJob.endDate.getTime());
    this.technicalResource = new TechnicalResource(previousJob.technicalResource);
  }
}
