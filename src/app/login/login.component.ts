import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  mockLoginMessage: string;
  
  constructor(public router: Router, public authenticateService: AuthenticateService) {
    if(this.authenticateService.mockLoginStatus) {
		this.mockLoginMessage = 'You are logged in.';
	} else {
		this.mockLoginMessage = 'You are not logged in.';
	}
  }
  
  login() {
    this.authenticateService.login();
	this.mockLoginMessage = 'You are logged in.';
  }
  
  logout() {
    this.authenticateService.logout();
	this.mockLoginMessage = 'You are not logged in.';
  }

  ngOnInit() {
  }

}
