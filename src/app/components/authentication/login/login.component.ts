import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {UserService} from '@services/user.service';
import {User} from '@model/User';
import {Organization} from '@model/Organization';
import {OrganizationService} from '@services/organization/organization.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private static EMAIL_REGEX: RegExp = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
  private emailIsValid: boolean;
  private invalidCredentials: boolean;
  private organizationIdentifier: string;

  @Input() organization: Organization;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private router: Router, private authenticateService: AuthenticateService) {
    this.emailIsValid = true;
    this.invalidCredentials = false;
  }

  /**
   * Uses the route to retrieve the organization for this component, important for setting the logo on the page
   */
  getOrganization(): void {
    this.organizationService.getOrganization(this.organizationIdentifier)
      .subscribe(response => this.organization = response, error => this.router.navigate(['login/']));
  }

  ngOnInit() {
	this.organizationIdentifier = this.route.snapshot.paramMap.get('uniqueIdentifier');
    this.getOrganization();
  }

	/**
	 * Tries to log in the user using the supplied email and password, redirects to the dashboard page on success
	 * and stores the user on local storage, on error it sets invalid credentials to true so the error message is
	 * displayed
	 * on error it sets invalid credentials to true
	 * @param email the email entered in the email field
	 * @param password the password entered in the password field
	 */
	login(email: string, password: string) {
		this.authenticateService.login(email, password, this.organizationIdentifier)
			.subscribe(() => {
				this.authenticateService.storeUser()
				.then(() => this.router.navigate(['/dashboard']));
        location.reload();
			}, () => this.invalidCredentials = true);
	}

  /**
   * Uses a regular expression to validate the email provided by the user
   * @param email the email the user entered in the email field
   */
  validateEmail(email: string, event: any) {
    if (event.type == 'keyup' && !this.emailIsValid) {
      // only validate email on keyup if it has been identified as invalid
      this.emailIsValid = LoginComponent.EMAIL_REGEX.test(email);
    } else if (event.type == 'blur') { // always validate the email on blur
      this.emailIsValid = LoginComponent.EMAIL_REGEX.test(email);
    }
  }

  /**
   * Clears the sign in error message, used when the email or password fields are updated
   */
  clearSignInError() {
    this.invalidCredentials = false;
  }
  
  redirectToForgotPassword(){
	this.router.navigate(['/forgot-password', this.organizationIdentifier]);
  }
}
