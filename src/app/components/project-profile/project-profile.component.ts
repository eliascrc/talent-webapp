import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
import {ProjectService} from '@services/project/project.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TechnicalResource} from '@model/TechnicalResource';
import {User} from '@model/User';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {FeedbackService} from '@services/feedback/feedback.service';

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
  username: string;
}

/**
 * Used to represent project positions and its holders.
 */
class ProjectPositionHolders {
  capability: string;
  resources: {id: string, name: string, picture: string}[];
}

/**
 * Used to store information about feedback that will be used with the modal
 */
class FeedbackModal extends NgbModalRef {
  observeeUsername: string;
  modalTitle: string;
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
  projectLead: User;
  loggedInUser: User;
  modalIsForKudo: boolean;
  modalDescription: string;
  resourceBelongsToProject: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService,
              private resourceService: ResourceInformationService, private modalService: NgbModal,
              private authenticateService: AuthenticateService, private feedbackService: FeedbackService) {
  }

  /**
   * Data querying of all the basic information and project positions history of the project.
   */
  ngOnInit() {
    this.modalDescription = '';
    this.resourceBelongsToProject = false;
    this.projectId = this.route.snapshot.paramMap.get('projectIdentifier');
    this.authenticateService.getLoggedInUserInfo().then(response => this.loggedInUser = response);
    this.projectService.getProjectBasicInformation(this.projectId).then(response => {
      const projectInfoObject = JSON.parse(JSON.stringify(response));
      this.projectName = projectInfoObject.name.charAt(0).toUpperCase() + projectInfoObject.name.substr(1);
      this.projectStartDate = projectInfoObject.startDate;
      this.projectEndDate = projectInfoObject.endDate != null ? projectInfoObject.endDate : 'Present';
      this.projectStatus = projectInfoObject.state;
      this.projectLead = projectInfoObject.projectLead;
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
      const projectPositionHolders = new ProjectPositionHolders();
      projectPositionHolders.resources = [];
      projectPositionHolders.capability = position.capabilityLevel.name + ' ' + position.capabilityLevel.capability.name;

      position.holderHistory.forEach(holder => {
        const profilePicture = (holder.resource.profilePicture == null ?
          ProjectProfileComponent.DEFAULT_PROFILE_PICTURE : holder.resource.profilePicture);
        const holderName = holder.resource.firstName + ' ' + holder.resource.lastName;
        projectPositionHolders.resources.push({id: holder.resource.id, name: holderName, picture: profilePicture});

        const projectResource = new ProjectResource();
        projectResource.id = holder.resource.id;
        if (projectResource.id === this.loggedInUser.id) {
          this.resourceBelongsToProject = true;
        }
        projectResource.name = holder.resource.firstName + ' ' + holder.resource.lastName;
        projectResource.technicalPosition = this.getProjectResourceTechnicalPosition(holder.resource.username);
        projectResource.profilePicture = holder.resource.profilePicture == null ?
          ProjectProfileComponent.DEFAULT_PROFILE_PICTURE : holder.resource.profilePicture;
        projectResource.startDate = holder.startDate;
        projectResource.endDate = holder.endDate != null ? holder.endDate : 'Present';
        projectResource.position = position.capabilityLevel.name + ' ' + position.capabilityLevel.capability.name;
        projectResource.hours = holder.assignedHours;
        projectResource.isActive = holder.active ? 'ACTIVE' : 'INACTIVE';
        projectResource.username = holder.resource.username;

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

  /**
   * Used to open a modal to give a kudo to an specific technical resource
   * @param {FeedbackModal} feedbackModal the modal for writing the description of the feedback
   * @param {string} technicalResourceUsername the username of the technical resource that will receive the feedback
   */
  openKudoModal(feedbackModal: FeedbackModal, technicalResourceUsername: string) {
    feedbackModal.observeeUsername = technicalResourceUsername;
    this.modalIsForKudo = true;
    this.modalService.open(feedbackModal, {size: 'lg', centered: true});
  }

  /**
   * Used to open a modal to give a warning to an specific technical resource
   * @param {FeedbackModal} feedbackModal the modal for writing the description of the feedback
   * @param {string} technicalResourceUsername the username of the technical resource that will receive the feedback
   */
  openWarningModal(feedbackModal: FeedbackModal, technicalResourceUsername: string) {
    feedbackModal.observeeUsername = technicalResourceUsername;
    this.modalIsForKudo = false;
    this.modalService.open(feedbackModal, {size: 'lg', centered: true});
  }

  /**
   * Used to confirm the description of a kudo to a technical resource
   * @param {FeedbackModal} feedbackModal the modal in which the description is written
   */
  confirmKudo(feedbackModal: FeedbackModal) {
    this.feedbackService.giveKudo(this.modalDescription, feedbackModal.observeeUsername, this.projectId)
      .toPromise();
  }

  /**
   * Used to confirm the description of a warning to a technical resource
   * @param {FeedbackModal} feedbackModal the modal in which the description is written
   */
  confirmWarning(feedbackModal: FeedbackModal) {
    this.feedbackService.giveWarning(this.modalDescription, feedbackModal.observeeUsername, this.projectId)
      .toPromise();
  }

  /**
   * Updates modalDescription with what is being written to see if the confirm button should be enabled
   * @param description the description that is being written
   */
  updateModalDescription(description) {
    this.modalDescription = description;
  }

}
