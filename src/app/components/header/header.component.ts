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
export class HeaderComponent implements OnInit {

  loggedIn = false;
  displayHeader = false;
  userOrganizationLogo: string;
  userName: string;
  displayLoggedInArea = false;
  userProfilePicture: string;

  constructor(private router: Router, private authenticateService: AuthenticateService, private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
          if (this.loggedIn) {
            this.authenticateService.getLoggedInUserInfo().then(userInfo => {
               const userInfoObject = JSON.parse(JSON.stringify(userInfo));
               console.log(userInfoObject);
               let name = userInfoObject.firstName;
               name = name.concat(' ');
               this.userName = name.concat(userInfoObject.lastName);
               this.organizationService.getOrganization(userInfoObject.organization.uniqueIdentifier)
                 .subscribe(userOrganization => {
                   this.userOrganizationLogo = JSON.parse(JSON.stringify(userOrganization)).logo;
                 });
            });
            this.userOrganizationLogo = '/assets/images/talent-logo.png';
          }
          this.displayHeader = true;
        }
      );
  }

  onLogout() {
    this.authenticateService.logout().then(response => {
      this.router.navigate(['/landing-page']);
      location.reload();
    });
  }

  onSignIn() {
      this.router.navigate(['/login']);
  }

  onLoggedInAreaChanged() {
    this.displayLoggedInArea = !this.displayLoggedInArea;
  }

}
