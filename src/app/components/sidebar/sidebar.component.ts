import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrganizationService} from '@services/organization/organization.service';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
/**
 * Application's sidebar, which is part of all components. It is only displayed for loggedin users.
 *
 * @author Josue Leon Sarkis
 */
export class SidebarComponent implements OnInit {
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  hamburgerClicked = false;
  userOrganizationNameInitial: string;

  constructor(private authenticateService: AuthenticateService, private organizationService: OrganizationService, private router: Router) { }

  ngOnInit() {
    this.authenticateService.getLoggedInUserInfo().then(userInfo => {
      const userInfoObject = JSON.parse(JSON.stringify(userInfo));
      this.organizationService.getOrganization(userInfoObject.organization.uniqueIdentifier)
        .subscribe(userOrganization => {
          this.userOrganizationNameInitial = userOrganization.name.charAt(0).toUpperCase();
        });
    });
  }

  onHamburgerClick() {
    this.hamburgerClicked = !this.hamburgerClicked;
    this.notify.emit(this.hamburgerClicked);
  }

  onViewOrganizationProfile() {
    this.router.navigate(['/organization-profile']);
  }

}
