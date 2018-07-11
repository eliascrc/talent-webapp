import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '@services/organization/organization.service';
import {ProjectService} from '@services/project/project.service';

/**
 * Represents an organization resource information.
 */
class OrganizationResource {
  id: string;
  name: string;
  profilePicture: string;
}

/**
 * Represents an active project information.
 */
class ActiveProject {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  resources: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/**
 * Dashboard page for logged-in users. It displays the main search bar, the newest organization members and the list of
 * active projects and their basic information.
 *
 * @author Josué León Sarkis
 */
export class DashboardComponent implements OnInit {

  organizationActiveProjects = [];
  organizationMembers = [];

  displayDashboard = false;
  totalPages: number;


  constructor(private router: Router, private organizationService: OrganizationService, private projectService: ProjectService) {
  }

  /**
   * Requests active projects and members to the organization and project service.
   */
  ngOnInit() {

    this.organizationService.getOrganizationMembers().then(response => {
      const orgMembersObj = JSON.parse(JSON.stringify(response));
      this.parseOrganizationMembers(orgMembersObj);

      this.totalPages = Math.ceil(this.organizationMembers.length);
      this.displayDashboard = true;
    });

    this.projectService.getActiveProjects().then(response => {
      const activeProjectsObj = JSON.parse(JSON.stringify(response));
      this.parseOrganizationActiveProjects(activeProjectsObj);
    });

  }

  /**
   * Parses the organization members.
   * @param {any[]} orgMembers
   */
  parseOrganizationMembers(orgMembers: any[]) {
    let allMembers = [];
    orgMembers.forEach(member => {
      const organizationResource = new OrganizationResource();
      organizationResource.id = member.id;
      organizationResource.name = member.firstName + ' ' + member.lastName;
      if (member.profilePicture != null)
        organizationResource.profilePicture = member.profilePicture.link;
      allMembers.push(organizationResource);
    });
    this.organizationMembers = allMembers;
  }

  /**
   * Parses the organization active projects.
   * @param {any[]} orgMembers
   */
  parseOrganizationActiveProjects(activeProjects: any[]) {
    activeProjects.forEach(project => {
      const activeProject = new ActiveProject();
      activeProject.id = project.id;
      activeProject.name = project.name;
      activeProject.startDate = project.startDate;
      activeProject.endDate = project.endDate == null ? 'Present' : project.endDate;
      activeProject.resources = [];
      project.projectPositions.forEach(position => {
        position.holderHistory.forEach(holder => {
          activeProject.resources.push(holder.resource.firstName + ' ' + holder.resource.lastName);
        });
      });
      this.organizationActiveProjects.push(activeProject);
    });
  }

  /**
   * Redirects the user to the resource's profile.
   * @param {string} resourceId
   */
  onSeeUserProfile(resourceId: string) {
    this.router.navigate(['/profile/user-profile', resourceId]);
  }

  /**
   * Redirects the user to the project's profile.
   * @param {string} projectId
   */
  onSeeProjectProfile(projectId: string) {
    this.router.navigate(['/project-profile', projectId]);
  }

}
