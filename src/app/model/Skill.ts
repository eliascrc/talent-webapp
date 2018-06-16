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
    this.resources = skill.resources;
    this.category = skill.category;
    this.skillType = skill.skillType;
    this.organization = skill.organization;
  }
}
