import {Position} from './Position';

export class JobPosition extends Position {
  startDate: Date;
  endDate: Date;

  constructor(jobPosition: any) {
    super(jobPosition);

    this.startDate = new Date(jobPosition.startDate.getTime());
    this.endDate = new Date(jobPosition.endDate.getTime());
  }

}
