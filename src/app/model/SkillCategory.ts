import { Skill } from './Skill';

export class CategorySkill extends Skill {
	name: string;
	
	constructor(categorySkill: any) {
		super(categorySkill);
		this.name = categorySkill.name;
	}
}