import {Invitation} from '@model/Invitation';

export class Invitations {
  invitations: Invitation[];

  constructor(invitations: any) {
    this.invitations = invitations.invitations;
  }

}
