import {BasicEntity} from '@model/BasicEntity';
import {Organization} from '@model/Organization';

/**
 * Class that represents an invitation to join the Talent system.
 * It contains the link of the image and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Invitation extends BasicEntity {
  email: String;
  token: String;
  isValid: boolean;
  organization: Organization;

  constructor(invitation: any) {
    super(invitation);
    this.email = invitation.email;
    this.token = invitation.token;
    this.isValid = invitation.isValid;
    this.organization = new Organization(invitation.organization);
  }
}
