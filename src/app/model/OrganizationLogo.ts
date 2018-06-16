import {Image} from '@model/Image';
import {Organization} from '@model/Organization';

/**
 * Class that represents an organization logo within the Talent system.
 * It contains the link of the image and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class OrganizationLogo extends Image {
  organization: Organization;

  constructor(organizationLogo: any) {
    super(organizationLogo);
    this.organization = new Organization(organizationLogo.organization);
  }
}
