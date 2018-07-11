import {Component, Input, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
import {ProjectPositionService} from '@services/project-position/project-position.service';

/**
 * Used to represent a project where the resource has participated.
 */
class ResourceProject {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  projectStatus: string;
  projectRedStatus = false;
  projectYellowStatus = false;
  resourcePosition: string;
}

/**
 * Used to represent a feedback that the resource has received.
 */
class ResourceFeedback {
  description: string;
  feedbackType: string;
  observer: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

/**
 * Manages all the profile information.
 *
 * @author Maria Jose Cubero
 */
export class UserProfileComponent implements OnInit {

  userId: string;
  name: string;
  userProfilePicture: string;
  loggedIn = false;
  position: string;
  canEdit = false;
  userProjects: ResourceProject[] = [];
  userFeedbacks: ResourceFeedback[] = [];
  noFeedbacks = false;

  constructor(private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute,
              private resourceService: ResourceInformationService, private router: Router,
              private projectPositionService: ProjectPositionService) {
  }

  /**
   * Data querying of the users profile information.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.userId = param['userId'];

      this.authenticateService.isLoggedIn()
        .then(response => {
            this.loggedIn = response;
            if (this.loggedIn) {
              this.resourceService.getTechnicalResourceBasicInfoWithId(this.userId)
                .then(userInfo => {
                  this.checkEditPermission(this.userId);
                  let name = userInfo.firstName;
                  name = name.concat(' ');
                  this.name = name.concat(userInfo.lastName);
                  this.userProfilePicture = userInfo.profilePicture.link;
                  this.getUsersProjects(userInfo.username);
                  this.getUsersFeedback(userInfo.username);
                }, error => {
                });
            }
          }
        );
    });
  }

  /**
   * Checks that the user is able to edit.
   * @param {string} userId
   */
  checkEditPermission(userId: string) {
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
          if (this.loggedIn) {
            this.authenticateService.getLoggedInUserInfo().then(userInfo => {
              const userInfoObject = JSON.parse(JSON.stringify(userInfo));
              const id = userInfoObject.id;
              const isAdmistrator = userInfoObject.administrator;
              if (this.userId == id) {
                this.canEdit = true;
              }
            });
          }
        }
      );
  }

  /**
   * Saves the projects of the user on a list.
   * @param {string} username
   */
  getUsersProjects(username: string) {
    this.resourceService.getTechnicalResourceProjects(username).then(projects => {
      projects.forEach(project => {
        const userProject = new ResourceProject();
        userProject.id = project.id;
        userProject.name = project.name;
        userProject.startDate = project.startDate;
        userProject.endDate = project.endDate != null ? project.endDate : 'Present';
        userProject.projectStatus = project.state;
        if (userProject.projectStatus == 'ON_HOLD') {
          userProject.projectYellowStatus = true;
        } else if (userProject.projectStatus == 'END') {
          userProject.projectRedStatus = true;
        }
        this.projectPositionService.getTechnicalResourceProjectPosition(username, project.id).then(response => {
          userProject.resourcePosition = response.projectPosition.capabilityLevel.capability.name;
        }, error => {
        });
        this.userProjects.push(userProject);
      });
    }, error => {
    });
  }

  /**
   * Saves the feedback of the resource in a list.
   * @param {string} username
   */
  getUsersFeedback(username: string) {
    this.resourceService.getTechnicalResourceFeedback(username).then(feedbacks => {
      feedbacks.forEach(feedback => {
        const userFeedback = new ResourceFeedback();
        userFeedback.description = feedback.description + '.';
        userFeedback.feedbackType = feedback.feedbackType;
        let name = feedback.observer.firstName;
        name = name.concat(' ');
        userFeedback.observer = name.concat(feedback.observer.lastName);
        this.userFeedbacks.push(userFeedback);
      });
    }, error => {
      this.noFeedbacks = true;
    });
  }

  /**
   * Sends the user to the edit profile page.
   */
  onEditButton() {
    const dir = '/profile/edit-profile/' + this.userId;
    this.router.navigate([dir]);
  }

  /**
   * Sends the user to the project profile
   */
  onSeeProject(projectId: string) {
    const dir = 'project-profile/' + projectId;
    this.router.navigate([dir]);
  }

}
