import {TechnicalResource} from './TechnicalResource';
import {CapabilityLevel} from '@model/CapabilityLevel';
import {BasicEntity} from '@model/BasicEntity';

/**
 * Class that represents a Technical Resource's position within the Talent system.
 * It contains the capability level related to the position and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Position extends BasicEntity {
  capabilityLevel: CapabilityLevel;
  technicalResource: TechnicalResource;

  constructor(position: any) {
    super(position);
    this.capabilityLevel = new CapabilityLevel(position.capabilityLevel);
    this.technicalResource = new TechnicalResource(position.technicalResource);
  }
}
