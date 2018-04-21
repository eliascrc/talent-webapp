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
	loginUsername: any = {};
	loginMessage: string;
	loggedUser: User;
	loggedIn: boolean;
	
	constructor(private router: Router, private authenticateService: AuthenticateService, private userService: UserService) {
	}
	
	ngOnInit() {
		// this should not go on constructor because it might generate http requests
		this.logout();
	}
	
	login(username) {
		// attempt to log in
		this.authenticateService.login(username).subscribe(
			data => {
				
			},
			error => {
				
			}
		);
		if(this.loggedUser) {
			this.loginMessage = 'Logged in as '+ this.loggedUser.username;
			this.loggedIn = true;
		} else {
			this.loginMessage = 'Failed to log in';
			this.loggedIn = false;
		}
	}
	
	logout() {
		this.authenticateService.logout();
		this.loginMessage = 'Not logged in';
		this.loggedIn = false;
	}

}
