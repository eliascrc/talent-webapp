import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ActivatedRoute, Route} from '@angular/router';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
import {ProjectPositionService} from '@services/project-position/project-position.service';

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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId: string;
  name: string;
  userProfilePicture: string;
  loggedIn = false;
  position: string;
  canEdit: boolean;
  userProjects: ResourceProject[] = [];

  constructor(private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute,
              private resourceService: ResourceInformationService) {
  }

  /**
   * Data querying of the users profile information.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.userId = param['userId'];
      this.checkEditPermission(this.userId);
      this.authenticateService.isLoggedIn()
        .then(response => {
            this.loggedIn = response;
            if (this.loggedIn) {
              this.resourceService.getTechnicalResourceBasicInfoWithId(this.userId)
                .then(userInfo => {
                  let name = userInfo.firstName;
                  name = name.concat(' ');
                  this.name = name.concat(userInfo.lastName);
                  this.userProfilePicture = userInfo.profilePicture;
                  this.userProfilePicture = userInfo.profilePicture.link;
                  this.getUsersProjects(userInfo.username);
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
    this.canEdit = false;
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
          if (this.loggedIn) {
            this.authenticateService.getLoggedInUserInfo().then(userInfo => {
              const userInfoObject = JSON.parse(JSON.stringify(userInfo));
              const id = userInfoObject.id;
              if (this.userId === id) {
                this.canEdit = true;
              }
            });
          }
        }
      );
  }

  /**
   * Saves the projects of the user on a list.
   */
  getUsersProjects(username: string) {
    this.resourceService.getTechnicalResourceProjects(username).then(projects => {
      projects.forEach( project => {
        console.log(project.name);
        console.log(project.description);
        console.dir(project);
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
        // this.projectPositionService.getTechnicalResourceProjectPosition(username, project.id).then( response => {
        //   userProject.resourcePosition = response.projectPosition;
        //   console.log(userProject.resourcePosition);
        // }, error => {
        // });
        this.userProjects.push(userProject);
      });
    }, error => {
    });
  }

  // This method will be implemented when the edit profile component is ready
  /**
   * Sends the user to the edit profile page.
   */
  onEditButton() {

  }

}
