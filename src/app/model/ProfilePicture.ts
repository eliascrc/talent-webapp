import {TechnicalResource} from '@model/TechnicalResource';

/**
 * Class that represents an profile picture within the Talent system.
 * It contains the link of the image and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class ProfilePicture extends Image {
  technicalResource: TechnicalResource;

  constructor(profilePicture: any) {
    super(profilePicture);
    this.technicalResource = new TechnicalResource(profilePicture.technicalResource);
  }
}
