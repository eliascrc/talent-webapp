import {Capability} from '@model/Capability';
import {Organization} from '@model/Organization';
import {Project} from '@model/Project';
import {BasicEntity} from '@model/BasicEntity';
import {Skill} from '@model/Skill';

/**
 * Class that represents a Capability Level within the Talent system.
 * It contains the capability level name, the level hierarchy position and the information inherited
 * from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class CapabilityLevel extends BasicEntity {
  name: string;
  hierarchyPosition: number;
  capability: Capability;
  requiredSkills: Set<Skill>;
  organization: Organization;
  projects: Set<Project>;

  constructor(capabilityLevel: any) {
    super(capabilityLevel);
    this.name = capabilityLevel.name;
    this.hierarchyPosition = capabilityLevel.hierarchyPosition;

    this.capability = new Capability(capabilityLevel.capability);

    this.requiredSkills = new Set();
    for (let skill of capabilityLevel.requiredSkills)
      this.requiredSkills.add(new Skill(skill));

    this.organization = new Organization(capabilityLevel.organization);

    this.projects = new Set();
    for (let project of capabilityLevel.projects)
      this.projects.add(new Project(project));
  }
}
