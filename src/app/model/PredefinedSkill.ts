export class PredefinedSkill extends Skill {
	category : PredefinedCategorySkill;
	
	constructor(predefinedSkill : any) {
		super(predefinedSkill);
		this.category = predefinedSkill.category;
	}
}