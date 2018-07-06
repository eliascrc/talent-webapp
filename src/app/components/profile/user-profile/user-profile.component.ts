import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ActivatedRoute, Route} from '@angular/router';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';

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

  constructor(private router: Router, private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute,
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
   * Sends the user to the edit profile page.
   */
  onEditButton() {
	this.router.navigate(['/profile/edit-profile']);
  }

}
