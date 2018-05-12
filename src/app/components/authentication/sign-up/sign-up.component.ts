import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	// gets filled by the form in the html
	newUserData: any = {};
  confirmUserData: any = {};
	triedToSignUp: boolean;
	resultString: string = '';

	// inject a UserService instance to create the user
	constructor(private userService: UserService) { }

	ngOnInit() {
		this.triedToSignUp = false;
	}

	signUp() {
		this.triedToSignUp = true;
		this.userService.create(this.newUserData).subscribe(
			data => {
				this.resultString = 'User created!';
			},
			error => {
				this.resultString = "Error: " + error;
			}
		);
	}

}
