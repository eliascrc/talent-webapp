import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ActivatedRoute, Route} from '@angular/router';

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
  userId: string;

  constructor(private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
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
