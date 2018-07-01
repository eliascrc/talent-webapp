import {OrganizationState} from './OrganizationState';
import {Project} from './Project';
import {TechnicalResource} from './TechnicalResource';
import {BasicEntity} from '@model/BasicEntity';
import {OrganizationLogo} from '@model/OrganizationLogo';
import {Invitation} from '@model/Invitation';
import {UserAuthenticationMethod} from '@model/UserAuthenticationMethod';
import {Capability} from '@model/Capability';
import {SkillCategory} from '@model/SkillCategory';

/**
 * Class that represents an organization within the Talent system. It contains the organization's
 * unique identifier, name, logo and other important information for Talent. It also contains the information inherited from
 * BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Organization extends BasicEntity {
  uniqueIdentifier: string;
  name: string;
  twoStepVerification: boolean;
  totalUsers: number;
  state: OrganizationState;
  logo: OrganizationLogo;
  invitations: Set<Invitation>;
  domain: string;
  userAuthenticationMethod: UserAuthenticationMethod;
  resources: Set<TechnicalResource>;
  capabilities: Set<Capability>;
  skillCategories: Set<SkillCategory>;
  projects: Set<Project>;

  constructor(organization: any) {
    super(organization);
    this.uniqueIdentifier = organization.uniqueIdentifier;
    this.name = organization.name;
    this.twoStepVerification = organization.twoStepVerification;
    this.totalUsers = organization.totalUsers;
    this.state = organization.state; // Enum

    this.logo = new OrganizationLogo(organization.logo);

    this.invitations = new Set();
    for(let invitation of organization.invitationsInput)
      this.invitations.add(new Invitation(invitation));

    this.domain = organization.domain;
    this.userAuthenticationMethod = organization.userAuthenticationMethod; // Enum

    this.resources = new Set();
    for (let resource of organization.resources)
      this.resources.add(new TechnicalResource(resource));

    this.capabilities = new Set();
    for (let capability of organization.capabilities)
      this.capabilities.add(new Capability(capability));

    this.skillCategories = new Set();
    for (let skillCategory of organization.skillCategories)
      this.skillCategories.add(new SkillCategory(skillCategory));

    this.projects = new Set();
    for (let project of organization.projects)
      this.projects.add(new Project(project));
  }
}
