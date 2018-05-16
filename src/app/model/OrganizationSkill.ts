import { Skill } from './Skill';
import { Organization } from './Organization';
import { TechnicalResource } from './TechnicalResource';

export class OrganizationSkill extends Skill{
	organization: Organization;
	resources: Set<TechnicalResource>;

	constructor() {
		super();
	}
}