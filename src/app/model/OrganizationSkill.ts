import { Skill } from './Skill';
import { Organization } from './Organization';
import { TechnicalResource } from './TechnicalResource';

export class OrganizationSkill extends Skill{
	organization: Organization;
	resources: Set<TechnicalResource>;

	constructor(organizationSkill: any) {
		super(organizationSkill);
		this.organization = new Organization(organizationSkill.organization);
		
		this.resources = new Set();
		for(let resource of organizationSkill.resources) this.resources.add(new TechnicalResource(resource));
	}
}