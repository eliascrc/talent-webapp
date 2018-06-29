import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {LocationStrategy} from '@angular/common';
import {OrganizationService} from '@services/organization/organization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * Application's header, which is part of all components. It displays different layouts depending if the user is logged in or not.
 *
 * @author Josue Leon Sarkis
 */
export class HeaderComponent implements OnInit {

  loggedIn = false;
  displayHeader = false;
  userOrganizationLogo: string;
  userName: string;
  displayLoggedInArea = false;
  userProfilePicture: string;

  constructor(public router: Router, private authenticateService: AuthenticateService, private organizationService: OrganizationService) {
  }

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
              this.organizationService.getOrganization(userInfoObject.organization.uniqueIdentifier)
                .subscribe(userOrganization => {
                  this.userOrganizationLogo = JSON.parse(JSON.stringify(userOrganization)).logo;
                });
            });
          }
          this.displayHeader = true;
        }
      );
  }

  onLogout() {
    this.authenticateService.logout().then(response => {
      this.router.navigate(['/login']);
      location.reload();
    });
  }

  onViewProfile() {
    this.router.navigate(['/profile/user-profile']);
    this.displayLoggedInArea = !this.displayLoggedInArea;
  }

  onSignIn() {
    this.router.navigate(['/login']);
  }

  onLoggedInAreaChanged() {
    this.displayLoggedInArea = !this.displayLoggedInArea;
  }

}
