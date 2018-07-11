import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '@services/organization/organization.service';
import {Router} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {consoleTestResultHandler} from 'tslint/lib/test';

/**
 * Used to represent the attributes needed of an organization project.
 */
class OrganizationProject {

  id: string;
  name: string;
  startDate: string;
  endDate: string;
  state: string;
  projectRedStatus = false;
  projectYellowStatus = false;
}

/**
 * Used to represent the attributes needed of an organization resource.
 */
class OrganizationResource {

  id: string;
  name: string;
  technicalPosition: string;
  profilePicture: string;
}

/**
 * User to represent a capability level of an organization.
 */
class OrganizationCapability {
  name: string;
  showCapabilityLevels: boolean;
  capabilityLevels: string[] = [];
}

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css'],
})
/**
 * Organization profile which contains the tabs to view organization related information such as members, capabilities, skills and projects.
 */
export class OrganizationProfileComponent implements OnInit {

  organizationProjects: OrganizationProject[] = [];
  organizationMembers: OrganizationResource[] = [];

  isAdministrator = false;
  organizationLoaded = true;
  organizationLogo: string;
  organizationName: string;
  organizationUniqueIdentifier: string;

  showMembers = false;
  showCapabilities = false;
  showSkills = false;
  showProjects = false;
  organizationCapabilities: OrganizationCapability[] = [];

  constructor(private organizationService: OrganizationService, private authenticateService: AuthenticateService, private router: Router) {
  }

  /**
   * Requests the organization's basic information to the organization service, and checks if the user is administrator of the
   * organization. It then obtains the organization's projects to display them in the Projects tab.
   */
  ngOnInit() {
    this.organizationService.getOrganizationBasicInfo().then(orgBasicInfo => {
      const orgBasicInfoObject = JSON.parse(JSON.stringify(orgBasicInfo));
      this.organizationLogo = orgBasicInfoObject.logo;
      this.organizationName = orgBasicInfoObject.name;
      this.organizationUniqueIdentifier = orgBasicInfoObject.uniqueIdentifier;
    }, error => {
    });

    this.authenticateService.getLoggedInUserInfo().then(response => {
      const userInfoObject = JSON.parse(JSON.stringify(response));
      this.isAdministrator = userInfoObject.administrator;
    }, error => {
    });

    this.processProjects();
    this.processMembers();
    this.parseOrganizationCapabilities();

    this.organizationLoaded = true;
  }

  /**
   * Toggles the members accordion content.
   */
  onShowMembers() {
    this.showMembers = !this.showMembers;
  }

  /**
   * Toggles the capabilities accordion content.
   */
  onShowCapabilities() {
    this.showCapabilities = !this.showCapabilities;

  }

  /**
   * Toggles the skills accordion content.
   */
  onShowSkills() {
    this.showSkills = !this.showSkills;

  }

  /**
   * Toggles the projects accordion content.
   */
  onShowProjects() {
    this.showProjects = !this.showProjects;

  }

  /**
   * Communicates with the Organization service to request its projects and parse their information.
   */
  processProjects() {
    this.organizationService.getOrganizationProjects().then(response => {
      this.parseOrganizationProjects(response);
    }, error => {
    });
  }

  /**
   * Communicates with the Organization service to request its members and parse their information.
   */
  processMembers() {
    this.organizationService.getOrganizationMembers().then(response => {
      this.parseOrganizationMembers(response);
    }, error => {
    });
  }

  /**
   * Parses the JSON object received to display all projects and their basic information.
   * @param {any[]} organizationProjects
   */
  parseOrganizationProjects(organizationProjects: any[]) {
    organizationProjects.forEach(project => {
      let organizationProject = new OrganizationProject();
      organizationProject.id = project.id;
      organizationProject.name = project.name;
      organizationProject.startDate = project.startDate;
      organizationProject.endDate = project.endDate == null ? 'Present' : project.endDate;
      organizationProject.state = project.state;
      if (organizationProject.state == 'ON_HOLD') {
        organizationProject.projectYellowStatus = true;
      } else if (organizationProject.state == 'END') {
        organizationProject.projectRedStatus = true;
      }
      this.organizationProjects.push(organizationProject);
    });
  }

  /**
   * Parses the JSON object received to display all members and their basic information.
   * @param {any[]} organizationMembers
   */
  parseOrganizationMembers(organizationMembers: any[]) {
    organizationMembers.forEach(resource => {
      let organizationResource = new OrganizationResource();
      organizationResource.id = resource.id;
      organizationResource.name = resource.firstName + ' ' + resource.lastName;
      organizationResource.profilePicture = resource.profilePicture.link;
      if (resource.technicalPosition != null)
        organizationResource.technicalPosition = resource.technicalPosition.capabilityLevel.name + ' ' + resource.technicalPosition.capabilityLevel.capability.name;
      this.organizationMembers.push(organizationResource);
    });
  }

  /**
   * Redirects the user to the project's profile.
   * @param {string} projectId
   */
  onSeeProjectProfile(projectId: string) {
    this.router.navigate(['/project-profile', projectId]);
  }

  /**
   * Triggered when clicking a resource's name or photo, to redirect to his profile.
   * @param {string} userId
   */
  onSeeUserProfile(userId: string) {
    this.router.navigate(['/profile/user-profile/', userId]);
  }
  
  /**
   * Triggered when clicking to edit organization information.
   */
  onEditProfile(){
	this.router.navigate(['/edit-organization-profile']);
  }

  /**
   * Parses the JSON object received to display all the organization capabilities.
   */
  parseOrganizationCapabilities() {
    this.organizationService.getOrganizationCapabilities().then(capabilities => {
      capabilities.forEach(capability => {
        const organizationCapability = new OrganizationCapability();
        organizationCapability.name = capability.name;
        organizationCapability.showCapabilityLevels = false;
         capability.levelHierarchy.forEach(capabilityLevel => {
           organizationCapability.capabilityLevels.push(capabilityLevel.name);
         });
        this.organizationCapabilities.push(organizationCapability);
      });
    }, error => {
    });
  }

  /**
   * Determines if the capability level of a capability must be shown.
   * @param {OrganizationCapability} capability
   */
  onShowCapabilityLevels(capability: OrganizationCapability) {
    capability.showCapabilityLevels = !capability.showCapabilityLevels;
  }
}
