import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '@services/authentication/authenticate.service';
import { UserService } from '@services/user.service';
import { User } from '@model/User';
import { Organization } from '@model/Organization';
import { OrganizationService } from '@services/organization/organization.service';
import {Http} from "@angular/http"

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	private emailIsValid: boolean;
	private invalidCredentials: boolean;
	private emailRegex: RegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

	@Input() organization: Organization
	constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private router: Router, private authenticateService: AuthenticateService) {
		this.emailIsValid = true;
		this.invalidCredentials = false;
		this.getOrganization();
	}

	/**
	 * Uses the route to retrieve the organization for this component, important for setting the logo on the page
	 */
	getOrganization(): void {
		const uniqueIdentifier: string = this.route.snapshot.paramMap.get('uniqueIdentifier');
		this.organizationService.getOrganization(uniqueIdentifier)
		.subscribe( response => this.organization = response, error => this.router.navigate(["login/"]));
	}

	ngOnInit() {

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
		this.authenticateService.login(email, password)
		.subscribe(() => { 
			this.router.navigate(['/dashboard']);
			this.authenticateService.storeUser();
		}, () => this.invalidCredentials = true );
	}

	logout() {

	}

	/**
	 * Uses a regular expression to validate the email provided by the user
	 * @param email the email the user entered in the email field
	 */
	validateEmail(email: string) {
		this.emailIsValid = this.emailRegex.test(email);
	}

}
