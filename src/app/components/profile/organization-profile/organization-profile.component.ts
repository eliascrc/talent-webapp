import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '@services/organization/organization.service';
import {Router} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css'],
})
/**
 * Organization profile which contains the tabs to view organization related information such as members, capabilities, skills and projects.
 */
export class OrganizationProfileComponent implements OnInit {

  isAdministrator = false;
  organizationLoaded = true;
  organizationLogo: string;
  organizationName: string;
  organizationUniqueIdentifier: string;

  showMembers = false;
  showCapabilities = false;
  showSkills = false;
  showProjects = false;

  constructor(private organizationService: OrganizationService, private authenticateService: AuthenticateService, private router: Router) { }

  /**
   * Requests the organization's basic information to the organization service, and checks if the user is administrator of the
   * organization.
   */
  ngOnInit() {
    this.organizationService.getOrganizationBasicInfo().then(orgBasicInfo => {
      const orgBasicInfoObject = JSON.parse(JSON.stringify(orgBasicInfo));
      this.organizationLogo = orgBasicInfoObject.logo;
      this.organizationName = orgBasicInfoObject.name;
      this.organizationUniqueIdentifier = orgBasicInfoObject.uniqueIdentifier;
    }, error => {});

    this.authenticateService.getLoggedInUserInfo().then(response => {
      const userInfoObject = JSON.parse(JSON.stringify(response));
      this.isAdministrator = userInfoObject.administrator;
    }, error => {});

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

}
