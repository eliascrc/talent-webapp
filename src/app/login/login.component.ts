import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/auth/authenticate.service';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	// loginUsername gets filled by the html
	loginData: any = {};
	loginMessage: string;
	fullName: string = "";
	loggedIn: boolean;
	
	constructor(private router: Router, private authenticateService: AuthenticateService, private userService: UserService) {
	}
	
	ngOnInit() {
		// this should not go on constructor because it might generate http requests
		this.logout();
	}
	
	login() {
		// attempt to log in
		this.authenticateService.login(this.loginData.username).subscribe(
			data => {
				this.loginMessage = 'Logged in as '+ data.username;
				this.fullName = data.firstName + ' ' + data.lastName;
				this.loggedIn = true;
			},
			error => {
				this.loginMessage = 'Failed to log in';
				this.fullName = null;
				this.loggedIn = false;
			}
		);
	}
	
	logout() {
		this.authenticateService.logout();
		this.loginMessage = 'Not logged in';
		this.loggedIn = false;
	}

}
