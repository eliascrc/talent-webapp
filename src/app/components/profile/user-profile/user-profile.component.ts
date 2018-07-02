import {Component, OnInit} from '@angular/core';
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

  constructor(private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute,
              private resourceService: ResourceInformationService) {
  }

  /**
   * Data querying of the users profile information.
   */
  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    if (this.userId !== this.getLoggedInUserId()) {
      document.getElementById('edit-option').style.display = 'none' ;
    }
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
                //this.position = userInfo.technicalPosition;
                console.log(this.userId);
                console.log(userInfo.id);
              }, error => {
              });
          }
        }
      );
  }

  /**
   * Queries the authenticateService to get the loggedIn user id.
   * @returns {any} loggedIn user id.
   */
  getLoggedInUserId(): any {
    this.authenticateService.getLoggedInUserInfo().then(loggedUserInfo => {
      const loggedUserInfoObject = JSON.parse(JSON.stringify(loggedUserInfo));
      return loggedUserInfoObject.id;
    });
  }

  // This method will be implemented when the edit profile component is ready
  /**
   * Sends the user to the edit profile page.
   */
  onEditButton() {

  }

}
