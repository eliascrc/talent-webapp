import {Invitation} from '@model/Invitation';

export class Invitations {
  people: Invitation[];

  constructor(invitations: any) {
    this.people = invitations.people;
  }

}
