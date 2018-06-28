import {BasicEntity} from '@model/BasicEntity';
import {TechnicalResource} from '@model/TechnicalResource';

/**
 * Class that represents a technical's resource emergency contact within the Talent system.
 * It contains the email, name, telephone and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class EmergencyContact extends BasicEntity {
  email: String;
  name: String;
  telephone: String;
  technicalResource: TechnicalResource;

  constructor(emergencyContact: any) {
    super(emergencyContact);
    this.email = emergencyContact.email;
    this.name = emergencyContact.name;
    this.telephone = emergencyContact.telephone;
    this.technicalResource = new TechnicalResource(emergencyContact.technicalResource);
  }
}
