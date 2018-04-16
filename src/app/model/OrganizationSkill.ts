export class OrganizationSkill extends Skill{
	organization : Organization;
	category : OrganizationCategorySkill;
	resources : Array<TechnicalResource>;

	constructor(organizationSkill : any) {
		super(organizationSkill);
		this.organization = organizationSkill.organization;
		this.category = organizationSkill.category;

		this.resources = Object.assign([], organizationSkill.resources);
	}
}