import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName: string;
  userProfilePicture: string;
  loggedIn = false;
  position: string;


  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
          if (this.loggedIn) {
            this.authenticateService.getLoggedInUserInfo().then(userInfo => {
              const userInfoObject = JSON.parse(JSON.stringify(userInfo));
              let name = userInfoObject.firstName;
              name = name.concat(' ');
              this.userName = name.concat(userInfoObject.lastName);
              this.userProfilePicture = userInfoObject.profilePicture.link;
              this.position = userInfoObject.technicalPosition;
            });
          }
        }
      );
  }

  // This method will be implemented when the edit profile component is ready
  onEditButton() { }

}
