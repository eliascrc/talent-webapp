import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '@services/organization/projects/project.service';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';

/**
 * Used to represent the resources that have been part of a project.
 */
class ProjectResource {

  id: string;
  name: string;
  technicalPosition: string;
  profilePicture: string;
  startDate: string;
  endDate: string;
  position: string;
  hours: number;
  isActive: string;
}

/**
 * Used to represent project positions and its holders.
 */
class ProjectPositionHolders {
  capability: string;
  resources: {id: string, name: string, picture: string}[];
}

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
/**
 * Manages all the project related information.
 *
 * @author Josue Leon Sarkis
 */
export class ProjectProfileComponent implements OnInit {

  static DEFAULT_PROFILE_PICTURE = '../../../../assets/images/defaultProfilePicture.png';
  projectResources: ProjectResource[] = [];
  projectPositionHolders: ProjectPositionHolders[] = [];
  projectId: string;
  projectLoaded = false;
  projectName: string;
  projectStartDate: string;
  projectEndDate: string;
  projectStatus: string;
  projectRedStatus = false;
  projectYellowStatus = false;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService, private resourceService: ResourceInformationService) {
  }

  /**
   * Data querying of all the basic information and project positions history of the project.
   */
  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectIdentifier');
    this.projectService.getProjectBasicInformation(this.projectId).then(response => {
      const projectInfoObject = JSON.parse(JSON.stringify(response));
      this.projectName = projectInfoObject.name.charAt(0).toUpperCase() + projectInfoObject.name.substr(1);
      this.projectStartDate = projectInfoObject.startDate;
      this.projectEndDate = projectInfoObject.endDate != null ? projectInfoObject.endDate : 'Present';
      this.projectStatus = projectInfoObject.currentState.eventType;
      if (this.projectStatus == 'ON_HOLD') {
        this.projectYellowStatus = true;
      } else if (this.projectStatus == 'END') {
        this.projectRedStatus = true;
      }

    }, error => {
      this.router.navigate(['/dashboard']);
    });
    this.projectService.getProjectPositionsHistory(this.projectId).then(response => {
      this.parseProjectResources(response);

    }, error => {
      this.router.navigate(['/dashboard']);
    });
    this.projectLoaded = true;
  }

  /**
   * Parsing of the data obtained from the project into the structures defined to bind them into the layout.
   * @param {any[]} projectPositions
   */
  parseProjectResources(projectPositions: any[]) {
    projectPositions.forEach(position => {
      let projectPositionHolders = new ProjectPositionHolders();
      projectPositionHolders.resources = [];
      projectPositionHolders.capability = position.capabilityLevel.name + ' ' + position.capabilityLevel.capability.name;

      position.holderHistory.forEach(holder => {
        let profilePicture = (holder.resource.profilePicture == null ?
          ProjectProfileComponent.DEFAULT_PROFILE_PICTURE : holder.resource.profilePicture);
        let holderName = holder.resource.firstName + ' ' + holder.resource.lastName;
        projectPositionHolders.resources.push({id: holder.resource.id, name: holderName, picture: profilePicture});

        let projectResource = new ProjectResource();
        projectResource.id = holder.resource.id;
        projectResource.name = holder.resource.firstName + ' ' + holder.resource.lastName;
        projectResource.technicalPosition = this.getProjectResourceTechnicalPosition(holder.resource.username);
        projectResource.profilePicture = holder.resource.profilePicture == null ?
          ProjectProfileComponent.DEFAULT_PROFILE_PICTURE : holder.resource.profilePicture;
        projectResource.startDate = holder.startDate;
        projectResource.endDate = holder.endDate != null ? holder.endDate : 'Present';
        projectResource.position = position.capabilityLevel.name + ' ' + position.capabilityLevel.capability.name;
        projectResource.hours = holder.assignedHours;
        projectResource.isActive = holder.active ? 'ACTIVE' : 'INACTIVE';

        this.projectResources.push(projectResource);
      });

      this.projectPositionHolders.push(projectPositionHolders);
    });

  }

  /**
   * Obtains the technical position of a resource by communicating with the technical resource service.
   * @param {string} username
   * @returns {string}
   */
  getProjectResourceTechnicalPosition(username: string): string {
    let technicalPosition = '';
    this.resourceService.getTechnicalResourceBasicInfo(username)
      .then(response => {
        technicalPosition = response.technicalPosition;
      }, error => {});
    return technicalPosition;
  }

  /**
   * Triggered when clicking a resource's name or photo, to redirect to his profile.
   * @param {string} userId
   */
  onSeeUserProfile(userId: string) {
    this.router.navigate(['/profile/user-profile/', userId]);
  }

}
