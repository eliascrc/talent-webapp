import {Invitation} from '@model/Invitation';

/**
 * Class used as a placeholder for serializing the invitations that the backend receives
 *
 * @author Elias Calderon
 */
export class Invitations {
  invitations: Invitation[];

  constructor(invitations: any) {
    this.invitations = invitations.invitations;
  }

}
