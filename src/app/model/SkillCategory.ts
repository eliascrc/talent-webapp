import {Skill} from './Skill';
import {BasicEntity} from '@model/BasicEntity';
import {Organization} from '@model/Organization';

/**
 * Class that represents a category for a set of skills within the Talent system.
 * It contains the name of the category and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class SkillCategory extends BasicEntity {
  name: string;
  organization: Organization;
  skills: Set<Skill>;

  constructor(skillCategory: any) {
    super(skillCategory);
    this.name = skillCategory.name;
    this.organization = skillCategory.organization;
    this.skills = skillCategory.skills;
  }
}
