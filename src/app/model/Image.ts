import {BasicEntity} from '@model/BasicEntity';

/**
 * Class that represents an image within the Talent system.
 * It contains the link of the image and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Image extends BasicEntity {
  link: string;

  constructor(image: any) {
    super(image);
    this.link = image.link;
  }
}
