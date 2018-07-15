import {TechnicalResource} from '@model/TechnicalResource';
import {SkillCategory} from '@model/SkillCategory';
import {Organization} from '@model/Organization';
import {BasicEntity} from '@model/BasicEntity';
import {SkillType} from '@model/SkillType';

/**
 * Class that represents a Skill within the Talent system.
 * It contains the name of the skill and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Skill extends BasicEntity {
  name: string;
  resources: Set<TechnicalResource>;
  category: SkillCategory;
  skillType: SkillType;
  organization: Organization;

  constructor(skill: any) {
    super(skill);
    this.name = skill.name;

    this.resources = new Set();
    if (skill.skills !== null && skill.skills !== undefined) {
      for (let resource of skill.resources)
        this.resources.add(resource);
    }

    if (skill.category !== null && skill.category !== undefined) {
      this.category = new SkillCategory(skill.category);
    }

    this.skillType = skill.skillType; // Enum

    if (skill.organization !== null && skill.organization !== undefined) {
      this.organization = new Organization(skill.organization);
    }
  }
}
