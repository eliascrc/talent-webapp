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

	getOrganization(): void {
		const uniqueIdentifier: string = this.route.snapshot.paramMap.get('uniqueIdentifier');
		this.organizationService.getOrganization(uniqueIdentifier)
		.subscribe( response => this.organization = response, error => this.router.navigate(["login/"]));
	}

	ngOnInit() {

	}

	login(email: string, password: string) {
		this.authenticateService.login(email, password)
		.subscribe(() => { 
			this.router.navigate(['/dashboard']);
			this.authenticateService.storeUser();
		}, () => this.invalidCredentials = true );
	}

	logout() {

	}

	validateEmail(email: string) {
		this.emailIsValid = this.emailRegex.test(email);
	}

}
