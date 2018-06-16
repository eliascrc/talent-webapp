import {CapabilityLevel} from './CapabilityLevel';
import {Organization} from '@model/Organization';
import {BasicEntity} from '@model/BasicEntity';

/**
 * Class that represents a Capability within the Talent system. It contains the capability name,
 * level hierarchy and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Capability extends BasicEntity {
  name: string;
  levelHierarchy: Set<CapabilityLevel>;
  associatedTechnologies: Set<String>;
  organization: Organization;

  constructor(capability: any) {
    super(capability);
    this.name = capability.name;

    this.levelHierarchy = new Set();
    for (let capabilityLevel of capability.levelHierarchy)
      this.levelHierarchy.add(new CapabilityLevel(capabilityLevel));

    this.associatedTechnologies = new Set();
    for (let technology of capability.associatedTechnologies)
      this.associatedTechnologies.add(technology);

    this.organization = new Organization(capability.organization);
  }
}
