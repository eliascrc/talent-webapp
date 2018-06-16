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
    this.state = organization.state;
    this.logo = organization.logo;
    this.invitations = organization.invitations;
    this.domain = organization.domain;
    this.userAuthenticationMethod = organization.userAuthenticationMethod;
    this.resources = organization.resources;
    this.capabilities = organization.capabilities;
    this.skillCategories = organization.skillCategories;
    this.projects = organization.projects;
  }
}
